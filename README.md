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
<sb-report-formResultTemplate
      :formId="id"
      >
    </sb-report-formResultTemplate>
    
<!-- 用formVersionId來渲染表單 -->    
<sb-report-documentReportTemplate :formVersionId="id">
    </sb-report-documentReportTemplate>
```

## Props

|name |type |required|default |description |
|-----|-----|--------|--------|------------|
|formId|String|true|" "|-|
|formVersionId|String|true|	""|-|

