---
title: BadDotDotDotSyntax
layout: article
---
<!-- Copyright 2023 The Go Authors. All rights reserved.
     Use of this source code is governed by a BSD-style
     license that can be found in the LICENSE file. -->

<!-- Code generated by generrordocs.go; DO NOT EDIT. -->

```
BadDotDotDotSyntax occurs when a "..." occurs in a context where it is
not valid.

Example:
 var _ = map[int][...]int{0: {}}
```

