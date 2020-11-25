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
        id: "formVersion",
        name: "formVersion",
        header: "FullPage",
        text: "formVersion",
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