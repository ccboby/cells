// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: config.proto

package rest

import (
	fmt "fmt"
	math "math"
	proto "github.com/golang/protobuf/proto"
	_ "github.com/pydio/cells/common/proto/object"
	_ "github.com/pydio/cells/common/proto/ctl"
	_ "github.com/pydio/cells/common/proto/tree"
	github_com_mwitkow_go_proto_validators "github.com/mwitkow/go-proto-validators"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

func (this *Configuration) Validate() error {
	return nil
}
func (this *ListDataSourceRequest) Validate() error {
	return nil
}
func (this *DataSourceCollection) Validate() error {
	for _, item := range this.DataSources {
		if item != nil {
			if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(item); err != nil {
				return github_com_mwitkow_go_proto_validators.FieldError("DataSources", err)
			}
		}
	}
	return nil
}
func (this *DeleteDataSourceResponse) Validate() error {
	return nil
}
func (this *ListPeersAddressesRequest) Validate() error {
	return nil
}
func (this *ListPeersAddressesResponse) Validate() error {
	return nil
}
func (this *ListPeerFoldersRequest) Validate() error {
	return nil
}
func (this *Process) Validate() error {
	return nil
}
func (this *ListProcessesRequest) Validate() error {
	return nil
}
func (this *ListProcessesResponse) Validate() error {
	for _, item := range this.Processes {
		if item != nil {
			if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(item); err != nil {
				return github_com_mwitkow_go_proto_validators.FieldError("Processes", err)
			}
		}
	}
	return nil
}
func (this *ListVersioningPolicyRequest) Validate() error {
	return nil
}
func (this *VersioningPolicyCollection) Validate() error {
	for _, item := range this.Policies {
		if item != nil {
			if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(item); err != nil {
				return github_com_mwitkow_go_proto_validators.FieldError("Policies", err)
			}
		}
	}
	return nil
}
func (this *ListVirtualNodesRequest) Validate() error {
	return nil
}
func (this *ListServiceRequest) Validate() error {
	return nil
}
func (this *ServiceCollection) Validate() error {
	for _, item := range this.Services {
		if item != nil {
			if err := github_com_mwitkow_go_proto_validators.CallValidatorIfExists(item); err != nil {
				return github_com_mwitkow_go_proto_validators.FieldError("Services", err)
			}
		}
	}
	return nil
}
func (this *ControlServiceRequest) Validate() error {
	return nil
}
func (this *DiscoveryRequest) Validate() error {
	return nil
}
func (this *DiscoveryResponse) Validate() error {
	// Validation of proto3 map<> fields is unsupported.
	return nil
}
func (this *ConfigFormRequest) Validate() error {
	return nil
}
func (this *OpenApiResponse) Validate() error {
	return nil
}
