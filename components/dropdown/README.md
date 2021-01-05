# **USAGE**

## 1. **Link STYLE**
  #### **from HTML**
``` html
<link rel="stylesheet" href="pathto/core/style/build/index.css"> <!-- for building custom dropdown -->
<link rel="stylesheet" href="pathto/select/style/build/index.css"> <!-- for prebuilt general dropdown-->
<link rel="stylesheet" href="pathto/field/style/build/index.css"> <!-- for prebuilt general dropdown with symbol-->
<link rel="stylesheet" href="pathto/disabled/style/build/index.css"> <!-- for disabled dropdown style-->
```
#### **from SASS/SCSS**
``` css
@use "pathto/core/style/index.scss" as *; // for building custom dropdown
@use "pathto/select/style/index.scss" as *; // for prebuilt general dropdown
@use "pathto/field/style/index.scss" as *; // for prebuilt general dropdown with symbol
@use "pathto/disabled/style/index.scss" as *; // for disabled dropdown style
```

## 2. **Link JS**
``` html
<script type="text/javascript" src="pathto/logic/build/index.js"></script>
```

**See dropdowns folder for examples**

## **Flags for specifying custom symbols**
*(Dont use them for implicit usage)*

1. **dropdown-custom-arrow-symbol** *(First symbol will be used for arrow)*
2. **dropdown-custom-option-symbols** *(Rest symbols will be used for options)*

*(In case of not using them)*
1. **First symbol will be used for arrow**
2. **Rest symbols will be used for options**