package rest

import "github.com/pydio/cells/common/proto/rest"

var settingsNode = &rest.SettingsMenuResponse{
	RootMetadata: &rest.SettingsEntryMeta{
		IconClass: "mdi mdi-view-dashboard",
		Component: "AdminComponents.SimpleDashboard",
	},
	Sections: []*rest.SettingsSection{
		{
			Key:         "idm",
			Label:       "settings.174",
			Description: "settings.174",
			Children: []*rest.SettingsEntry{
				{
					Key:         "users",
					Label:       "settings.2",
					Description: "settings.139",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-account-circle",
						Component: "AdminPeople.Dashboard",
						Props:     `{"advancedAcl":false}`,
					},
				},
				{
					Key:         "roles",
					Label:       "settings.69",
					Description: "settings.71",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-account-card-details",
						Component: "AdminPeople.RolesDashboard",
						Props:     `{"advancedAcl":false}`,
					},
				},
				{
					Key:         "policies",
					Label:       "settings.176",
					Description: "settings.177",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-security",
						Component: "AdminPeople.PoliciesBoard",
						Props:     `{"readonly":true}`,
					},
				},
			},
		},
		{
			Key:         "data",
			Label:       "settings.175",
			Description: "settings.175",
			Children: []*rest.SettingsEntry{
				{
					Key:         "workspaces",
					Label:       "settings.3",
					Description: "settings.138",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-folder-open",
						Component: "AdminWorkspaces.WsDashboard",
						Props:     `{"filter":"workspaces"}`,
					},
				},
				{
					Key:         "datasources",
					Label:       "settings.3b",
					Description: "settings.3b",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-database",
						Component: "AdminWorkspaces.DataSourcesBoard",
						Props:     `{"versioningReadonly":true}`,
					},
				},
				{
					Key:         "template-paths",
					Label:       "settings.3c",
					Description: "settings.3c",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-file-tree",
						Component: "AdminWorkspaces.VirtualNodes",
						Props:     `{"readonly":true}`,
					},
				},
				{
					Key:         "metadata",
					Label:       "Metadata",
					Description: "Metadata Definition",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-tag-multiple",
						Component: "AdminWorkspaces.MetadataBoard",
					},
				},
			},
		},
		{
			Key:         "admin",
			Label:       "settings.111",
			Description: "settings.141",
			Children: []*rest.SettingsEntry{
				{
					Key:         "services",
					Label:       "settings.172",
					Description: "settings.173",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-access-point-network",
						Component: "AdminServices.Dashboard",
					},
				},
				{
					Key:         "logs",
					Label:       "settings.4",
					Description: "settings.142",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-pulse",
						Component: "AdminLogs.Dashboard",
						Props:     `{"disableExport":true}`,
					},
				},
				{
					Key:         "update",
					Label:       "updater.1",
					Description: "updater.2",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-update",
						Component: "AdminPlugins.UpdaterDashboard",
					},
				},
				{
					Key:         "scheduler",
					Label:       "action.scheduler.18",
					Description: "action.scheduler.22",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-timetable",
						Component: "AdminScheduler.Dashboard",
					},
				},
			},
		},
		{
			Key:         "parameters",
			Label:       "settings.109",
			Description: "settings.136",
			Children: []*rest.SettingsEntry{
				{
					Key:         "core",
					Label:       "settings.98",
					Description: "settings.133",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-settings-box",
						Component: "AdminPlugins.PluginEditor",
						Props:     "{\"pluginId\":\"core.pydio\"}",
					},
				},
				{
					Key:         "core.auth",
					Label:       "ajxp_admin.menu.11",
					Description: "plugtype.desc.auth",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-account-key",
						Component: "AdminPlugins.AuthenticationPluginsDashboard",
					},
				},
				{
					Key:         "uploader",
					Label:       "ajxp_admin.menu.9",
					Description: "ajxp_admin.menu.10",
					Alias:       "/config/plugins/uploader",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-upload",
						Component: "AdminPlugins.CoreAndPluginsDashboard",
						Props:     "{\"pluginId\":\"core.uploader\"}",
					},
				},
				{
					Key:         "mailer",
					Label:       "plugtype.title.mailer",
					Description: "plugtype.desc.mailer",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-email",
						Component: "AdminPlugins.ServiceEditor",
						Props:     `{"serviceName":"pydio.grpc.mailer"}`,
					},
				},
			},
		},
		{
			Key:         "plugins",
			Label:       "ajxp_admin.menu.18",
			Description: "ajxp_admin.menu.18",
			Children: []*rest.SettingsEntry{
				{
					Key:         "manager",
					Label:       "ajxp_admin.menu.19",
					Description: "ajxp_admin.menu.19",
					Alias:       "/config/all",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-google-circles-group",
						Component: "AdminPlugins.PluginsManager",
					},
				},
				{
					Key:         "apis",
					Label:       "Rest APIs",
					Description: "Rest APIs",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-routes",
						Component: "AdminPlugins.OpenApiDashboard",
					},
				},
				{
					Key:         "jsdocs",
					Label:       "Javascript Docs",
					Description: "Javascript Classes Documentation",
					Metadata: &rest.SettingsEntryMeta{
						IconClass: "mdi mdi-nodejs",
						Component: "AdminPlugins.JSDocsDashboard",
					},
				},
			},
		},
	},
}