/*
 * Copyright (c) 2019. Abstrium SAS <team (at) pydio.com>
 * This file is part of Pydio Cells.
 *
 * Pydio Cells is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Pydio Cells is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Pydio Cells.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The latest code can be found at <https://pydio.com>.
 */

package merger

import (
	"path"
	"strings"

	"github.com/pydio/cells/common/proto/tree"
)

// OriginalPath rebuilds node Path climbing to the root
func (t *TreeNode) OriginalPath() string {
	if t.parent == nil {
		return t.Path
	}
	return path.Join(t.parent.OriginalPath(), t.Label())
}

// ProcessedPath builds node Path to the root taking all moves into account
func (t *TreeNode) ProcessedPath(asProcessed bool, isNext ...bool) string {
	if t.parent == nil {
		return t.Path
	}
	label := t.Label()
	if len(isNext) > 0 && t.PathOperation != nil && t.PathOperation.IsTypeMove() && (asProcessed || t.PathOperation.IsProcessed()) {
		// Compute target from t.PathOperation.OpMoveTarget
		return t.OpMoveTarget.ProcessedPath(asProcessed, true)
	}
	return path.Join(t.parent.ProcessedPath(asProcessed, true), label)
}

// PruneIdentityPathOperation detects if this PathOperation will result in Identity, remove it in that case.
func (t *TreeNode) PruneIdentityPathOperation() bool {
	if t.OpMoveTarget != nil {
		// Compare finally paths after all tree will be processed
		modSrc := t.ProcessedPath(true)
		modTarget := t.OpMoveTarget.ProcessedPath(true)
		if modSrc == modTarget {
			t.PathOperation = nil
			t.OpMoveTarget = nil
			return true
		}
	}
	return false
}

// QueueOperation registers an operation at a given path, by eventually building
// traversing nodes without operations on them
func (t *TreeNode) QueueOperation(op Operation) {
	crtParent := t
	n := op.GetNode()
	p := n.Path
	split := strings.Split(p, "/")
	for i, _ := range split {
		childPath := strings.Join(split[:i+1], "/")
		if i == len(split)-1 {
			var last *TreeNode
			if c, o := crtParent.children[childPath]; o {
				last = c
			} else {
				last = NewTreeNode(n)
				crtParent.AddChild(last)
			}
			switch op.Type() {
			case OpMoveFile, OpMoveFolder:
				last.PathOperation = op
				last.OpMoveTarget = t.getRoot().createNodeDeep(op.GetRefPath())
			case OpCreateFolder, OpDelete:
				last.PathOperation = op
			case OpCreateFile, OpUpdateFile, OpRefreshUuid:
				last.DataOperation = op
			}
		} else if c, o := crtParent.children[childPath]; o {
			crtParent = c
		} else {
			n := NewTreeNode(&tree.Node{Path: childPath})
			crtParent.AddChild(n)
			crtParent = n
		}
	}
}

// WalkOperations walks the tree looking for operation of a certain type
func (t *TreeNode) WalkOperations(opTypes []OperationType, callback func(Operation)) {
	filter := func(o Operation) bool {
		if o == nil {
			return false
		}
		if len(opTypes) == 0 {
			return true
		}
		for _, oT := range opTypes {
			if o.Type() == oT {
				return true
			}
		}
		return false
	}
	// TODO CLONE OPERATION?
	recompute := func(t *TreeNode, o Operation) {
		if t.OpMoveTarget != nil {
			o.UpdateRefPath(t.OpMoveTarget.ProcessedPath(false))
			o.UpdateMoveOriginPath(t.ProcessedPath(false))
		} else {
			o.UpdateRefPath(t.ProcessedPath(false))
		}
	}
	if filter(t.PathOperation) {
		recompute(t, t.PathOperation)
		callback(t.PathOperation)
	}
	if filter(t.DataOperation) {
		recompute(t, t.DataOperation)
		callback(t.DataOperation)
	}
	for _, c := range t.SortedChildren() {
		c.WalkOperations(opTypes, callback)
	}
}
