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
        id: "Enter",
        name: "Enter",
        header: "Enter",
        text: "sidebar.enter",
        icon: "mdi-view-dashboard",
        params: { projectId: null },
        subMenuItems: [],
 
    },
    {
        id: "FormResultTemplate",
        name: "FormResultTemplate",
        header: "FormResultTemplate",
        text: "FormResultTemplate",
        icon: "mdi-view-dashboard",
        params: { projectId: null },
        subMenuItems: [],
 
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