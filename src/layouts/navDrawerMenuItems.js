//src/layouts/navDrawerMenuItems.js
import viewPermission from "../../node_modules/syncobox-shared/src/config/viewPermission.js"

export default [{
        id: "Main page",
        name: "Home",
        header: "Main",
        text: "sidebar.project_list",
        icon: "mdi-view-dashboard-outline",
        params: { projectId: null },
        subMenuItems: [],
        meta: {
            ...viewPermission["Home"]
        }
    },
    {
        id: "About",
        name: "About",
        header: "FullPage",
        text: "sidebar.about",
        icon: "mdi-view-dashboard",
        params: { projectId: null },
        subMenuItems: [],
        meta: {
            ...viewPermission["About"]
        }
    },
    {
        id: "uploadFile",
        name: "uploadFile",
        header: "FullPage",
        text: "uploadFile",
        icon: "mdi-view-dashboard",
        params: { formVersionId: '51bb96ec-30e2-4697-869c-94c47b43cc14' },
        subMenuItems: [],
        meta: {
            ...viewPermission["uploadFile"]
        }
    },
    {
        id: "formVersion",
        name: "formVersion",
        header: "FullPage",
        text: "FormResultUpolad",
        icon: "mdi-view-dashboard",
        params: { formId: '88787421-5690-451e-a1ed-e41797d0d822' },
        subMenuItems: [],
        meta: {
            ...viewPermission["formVersion"]
        }
    },
    {
        id: "projectPhoto",
        name: "projectPhoto",
        header: "FullPage",
        text: "projectPhoto",
        icon: "mdi-view-dashboard",
        params: { projectId:'5252057b-5fa6-4eba-9e75-a9b9cd972b2f' },
        subMenuItems: [],
        meta: {
            ...viewPermission["projectPhoto"]
        }
    },
    {
        id: "Server",
        name: "Server",
        header: "FullPage",
        text: "Server",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["Server"]
        }
    },
    {
        id: "ServerSetting",
        name: "ServerSetting",
        header: "FullPage",
        text: "ServerSetting",
        icon: "mdi-view-dashboard",
        params: { serverId:"" },
        meta: {
            ...viewPermission["ServerSetting"]
        }
    },
    {
        id: "CompanyList",
        name: "CompanyList",
        header: "FullPage",
        text: "CompanyList",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["CompanyList"]
        }
    },
    {
        id: "CompanySetting",
        name: "CompanySetting",
        header: "FullPage",
        text: "CompanySetting",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["CompanySetting"]
        }
    },
    {
            id: "AccessControlDialog",
            name: "AccessControlDialog",
            header: "FullPage",
            text: "AccessControlDialog",
            icon: "mdi-view-dashboard",
            meta: {
                ...viewPermission["AccessControlDialog"]
            }
        },
        {
            id: "ShareControlDialog",
            name: "ShareControlDialog",
            header: "FullPage",
            text: "ShareControlDialog",
            icon: "mdi-view-dashboard",
            meta: {
                ...viewPermission["ShareControlDialog"]
            }
        },
    // =============================================================================
    // PROJECT
    // =============================================================================
    // {
    //     id: "project overview",
    //     header: "sidebar.project_management",
    //     text: "sidebar.project_overview",
    //     name: "ProjectOverview",
    //     icon: "mdi-monitor-dashboard",
    //     visible: false,
    //     subMenuItems: [],
    //     meta: {
    //         ...viewPermission["ProjectOverview"]
    //     }
    // }
];