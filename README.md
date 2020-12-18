# syncobox-report

## 安裝
```
npm install syncobox-report
```

### 使用方式

## main.js

```
import syncoboxReport from "syncobox-report";
import "syncobox-report/dist/syncobox-report.css";
Vue.use(syncoboxReport);
```

### Usage
```
<!-- 用formId來渲染表單 -->
<FormResultUpolad
      :formId="id"
      >
    </FormResultUpolad>
    
<!-- 用formVersionId來渲染表單 -->    
<UploadFile :formVersionId="id">
    </UploadFile>
```

## Props

|name |type |required|default |description |
|-----|-----|--------|--------|------------|
|formId|String|true|" "|-|
|formVersionId|String|true|	""|-|

