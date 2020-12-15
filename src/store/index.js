import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server:{
      "data": [
        {
          "id": 1,
          "machineName": "WEBIM-SERVER02",
          "serverName": "Taiwan-WeBIM",
          "description": "衛武資訊台灣BIM服務客戶"
        },
        {
          "id": 4,
          "machineName": "China-Drxcd",
          "serverName": "China-Drxcd_Intranet",
          "description": "迪瑞成都內部網路專用"
        },
        {
          "id": 5,
          "machineName": "WEBIM-SERVER02",
          "serverName": "Taiwan-建國總公司區網_02",
          "description": "建國內部網路專用"
        },
        {
          "id": 8,
          "machineName": "WeBIM-Server",
          "serverName": "Taiwan-WeBIM-02",
          "description": "衛武資訊台灣BIM服務客戶"
        },
        {
          "id": 9,
          "machineName": "Taiwan-Drxcd",
          "serverName": "Taiwan-Drxcd_Intranet",
          "description": "迪瑞台北內部伺服器"
        },
        {
          "id": 11,
          "machineName": "WeBIM-Server03",
          "serverName": "建國總公司_01",
          "description": "建國工程專用伺服器-區網"
        },
        {
          "id": 12,
          "machineName": "WeBIM-Server03",
          "serverName": "衛武資訊-台灣",
          "description": "衛武資訊台灣伺服器"
        },
        {
          "id": 14,
          "machineName": "WeBIM-Server04",
          "serverName": "建國總公司區網_02",
          "description": "建國內部網路專用"
        },
        {
          "id": 15,
          "machineName": "WeBIM-Server03",
          "serverName": "Taiwan-試用伺服器",
          "description": "衛武資訊新版測試"
        },
        {
          "id": 22,
          "machineName": "WeBIM-Server03",
          "serverName": "衛武資訊外部網路伺服器",
          "description": "衛武資訊專案服務客戶"
        }
      ],
      "total": 10,
      "aggregateResults": null,
      "errors": null
    },
    user:{
      "data": [
        {
          "user": {
            "id": "1414c824-9640-43e7-80a0-0a64084286b8",
            "name": "WB15",
            "email": "WB15@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "149c5518-a003-41bb-9cf3-fe2ac9aa10f1",
            "name": "謝易修",
            "email": "danielhsieh@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "163747a6-f60f-4982-908e-ce6f8914a5e9",
            "name": "劉其昌",
            "email": "lucienliu@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "1c3cc134-6bd5-49cc-8a39-ab0ca55742f0",
            "name": "WB22",
            "email": "WB22@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "1cd07be8-2db3-4c20-bddd-ba4c5b28fe44",
            "name": "WB05",
            "email": "WB05@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "1d92ef7e-2fd3-4544-8383-0cc4155c507e",
            "name": "WB04",
            "email": "WB04@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "1eceea3a-688f-4bb8-ad35-a365426304e0",
            "name": "WB23",
            "email": "WB23@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "234f2374-1919-4f79-82e1-29853afc5bf3",
            "name": "黃政家",
            "email": "kevinhuang@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        },
        {
          "user": {
            "id": "2585eefb-edc1-4107-b4a9-6ecc3d9ede20",
            "name": "陳秀圓",
            "email": "hychen@webim.com.tw"
          },
          "company": {
            "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊"
          }
        }],
      "total": 416,
      "aggregateResults": null,
      "errors": null
      },
    added:{
      "data": [        
        {
        "user": {
          "id": "1414c824-9640-43e7-80a0-0a64084286b8",
          "name": "WB15",
          "email": "WB15@webim.com.tw"
        },
        "company": {
          "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
          "name": "衛武資訊"
        }
      },
      {
        "user": {
          "id": "149c5518-a003-41bb-9cf3-fe2ac9aa10f1",
          "name": "謝易修",
          "email": "danielhsieh@webim.com.tw"
        },
        "company": {
          "companyId": "032ea610-9425-44fc-b2d3-352fa5fc6982",
          "name": "衛武資訊"
        }
      }
    ],
      "total": 416,
      "aggregateResults": null,
      "errors": null
    },
    authorize:{
      "data": [
        {
          "id": "01aeb395-b0f6-46e7-8ca3-73383bd0ef65",
          "name": "兆申機電",
          "userMax": 0,
          "enable": false
        },
        {
          "id": "032ea610-9425-44fc-b2d3-352fa5fc6982",
          "name": "衛武資訊",
          "userMax": 9993,
          "enable": true
        },
        {
          "id": "11653045-8aa7-4b34-ace9-42efdde07149",
          "name": "大元建築師事務所",
          "userMax": 3,
          "enable": true
        },
        {
          "id": "1a7986be-559a-4640-b4b2-5742358daae4",
          "name": "建國工程",
          "userMax": 19,
          "enable": true
        },
        {
          "id": "1bceb2e7-7dfd-4b62-8628-4fb537d289a4",
          "name": "德孚建設",
          "userMax": 0,
          "enable": false
        },
        {
          "id": "402b6471-0cad-4f73-9b20-66977b95853f",
          "name": "AICI",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "578f11cc-a74e-4011-8466-6d611a071fa7",
          "name": "永雄建設機構",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "6d77a89f-ef4c-44f9-a1d4-85645f5ee216",
          "name": "李文勝建築師事務所",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "88be52ad-fa27-457b-9f0b-2485450eb8be",
          "name": "中興電工",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "89921bda-0462-4f8e-9ce5-cb51d1a2d4bd",
          "name": "?????",
          "userMax": 0,
          "enable": true
        },
        {
          "id": "8a4b014c-cb54-4042-a3fa-38e5ee218d99",
          "name": "上海夏和建築設計有限公司",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "8ef5ecd8-748a-468a-950d-43d09847c1d0",
          "name": "SyncoBox",
          "userMax": 10,
          "enable": true
        },
        {
          "id": "97b5c5f6-5146-4455-a15c-655bf6112306",
          "name": "富邦人壽保險股份有限公司",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "9f67550e-e783-4f29-8b78-bd615c601339",
          "name": "廣宇建設實業股份有限公司",
          "userMax": 2,
          "enable": true
        },
        {
          "id": "a046d025-0d2c-4e68-9b43-292ca0e019ed",
          "name": "潘冀建築師事務所",
          "userMax": 3,
          "enable": true
        },
        {
          "id": "a586009c-a24a-4836-80a5-31e6b1e12ebc",
          "name": "嘉新資產管理開發股份有限公司",
          "userMax": 2,
          "enable": true
        },
        {
          "id": "b1e63e54-bf02-4ec9-b98a-65f76b3deca4",
          "name": "榮民工程股份有限公司",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "b3f8e320-866b-42fb-9351-a9bf851e7595",
          "name": "永齡建康基金會",
          "userMax": 2,
          "enable": false
        },
        {
          "id": "bf4071fc-4daa-47c2-9683-75633b78aeac",
          "name": "教育訓練用",
          "userMax": 30,
          "enable": true
        },
        {
          "id": "c050e506-2f25-41c8-87f4-36ee06dcc44a",
          "name": "蛭川金屬",
          "userMax": 2,
          "enable": true
        },
        {
          "id": "c47ef2b6-8c8c-4919-882c-f65ffef948ec",
          "name": "迪瑞製藥",
          "userMax": 0,
          "enable": false
        },
        {
          "id": "cb2bcbc5-7fa3-46e4-9341-88f82bfc2974",
          "name": "台北科技大學",
          "userMax": 0,
          "enable": false
        },
        {
          "id": "d22c70be-ffe0-475b-9d35-34d45d3e22eb",
          "name": "逢甲大學",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "d9d90dce-af17-4117-882f-1ff6f8d1e2bb",
          "name": "國泰建設",
          "userMax": 1,
          "enable": true
        },
        {
          "id": "ff526057-1998-43a7-9847-4623712eb980",
          "name": "測試公司(2)",
          "userMax": 0,
          "enable": true
        }
      ],
      "total": 25,
      "aggregateResults": null,
      "errors": null
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
