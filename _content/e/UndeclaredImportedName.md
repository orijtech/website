---
title: UndeclaredImportedName
layout: article
---
<!-- Copyright 2023 The Go Authors. All rights reserved.
     Use of this source code is governed by a BSD-style
     license that can be found in the LICENSE file. -->

<!-- Code generated by generrordocs.go; DO NOT EDIT. -->

```
UndeclaredImportedName occurs when a package-qualified identifier is
undeclared by the imported package.

Example:
 import "go/types"

 var _ = types.NotAnActualIdentifier
```

