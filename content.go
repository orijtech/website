// Copyright 2013 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

// Package website exports the static content as an embed.FS.
package website

import (
	"embed"
	"io/fs"
)

// Content returns the go.dev website's static content.
func Content() fs.FS {
	return subdir(embedded, "_content")
}

func ContentV2() fs.FS {
	return subdir(embeddedV2, "_content_v2")
}

// TourOnly returns the content needed only for the standalone tour.
func TourOnly() fs.FS {
	return subdir(tourOnly, "_content")
}

func TourOnlyV2() fs.FS {
	return subdir(tourOnlyV2, "_content_v2")
}

//go:embed _content
var embedded embed.FS

//go:embed _content_v2
var embeddedV2 embed.FS

//go:embed _content/favicon.ico
//go:embed _content/images/go-logo-white.svg
//go:embed _content/images/icons
//go:embed _content/js/playground.js
//go:embed _content/tour
var tourOnly embed.FS

//go:embed _content_v2/favicon.ico
//go:embed _content_v2/images/go-logo-white.svg
//go:embed _content_v2/images/icons
//go:embed _content_v2/js/playground.js
//go:embed _content_v2/tour
var tourOnlyV2 embed.FS

func subdir(fsys fs.FS, path string) fs.FS {
	s, err := fs.Sub(fsys, path)
	if err != nil {
		panic(err)
	}
	return s
}
