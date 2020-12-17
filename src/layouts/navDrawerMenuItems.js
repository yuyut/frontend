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
        id: "server",
        name: "server",
        header: "FullPage",
        text: "server",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["server"]
        }
    },
    {
        id: "tawan-webim",
        name: "server-setting",
        header: "FullPage",
        text: "taiwan-webim",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["webim"]
        }
    },
    {
        id: "company-list",
        name: "company-list",
        header: "FullPage",
        text: "company-list",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["company-list"]
        }
    },
    {
        id: "company-setting",
        name: "company-setting",
        header: "FullPage",
        text: "company-setting",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["company-setting"]
        }
    },
     {
        id: "company-addRecord",
        name: "company-addRecord",
        header: "FullPage",
        text: "company-addRecord",
        icon: "mdi-view-dashboard",
        meta: {
            ...viewPermission["company-addRecord"]
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