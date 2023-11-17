<!--{
  "Title": "Tutorial: Configure gopls",
  "Breadcrumb": true
}-->

Gopls, the language server for Go, provides tooling support such as autocompletion, hover text, formatting, and diagnostics for any compatible editor. This page explains how to install and configure gopls in your preferred editor.


## Prerequisites

*   **Latest version of Go**. Gopls supports the latest 2 versions of Go, and maintains the last 4 versions 
  of Go. As per the [Go Release Policy](https://go.dev/doc/devel/release#policy), one of the two latest versions is recommended. For installation instructions, see [Installing Go](/doc/install).

*   **A compatible editor**. Choose from the list below.

*   **A Language Server Protocol (LSP) plugin or extension** from the list below.

## How to install gopls

Gopls can be used without installing or updating it manually. Your editor should handle it for you. To get started with gopls, install an LSP plugin in the editor of your choice. See links to relevant plugins in other IDEs: 

*   [Vim/Neovim](https://github.com/golang/tools/blob/master/gopls/doc/vim.md)
*   [Emacs](https://github.com/golang/tools/blob/master/gopls/doc/emacs.md)
*   [Atom](https://github.com/MordFustang21/ide-gopls)
*   [Sublime Text](https://github.com/golang/tools/blob/master/gopls/doc/subl.md)
*   [Acme](https://github.com/fhs/acme-lsp)
*   [Lapce](https://github.com/lapce-community/lapce-go)


After you install an LSP plugin and open a Go project, your IDE will prompt you to install gopls. If you confirm, your IDE will handle the process for you. 

To manually install the latest stable version of gopls run the following command:  
 

```
go install golang.org/x/tools/gopls@latest
```

## How to configure gopls

After installing gopls, you can configure the settings to improve your editor experience or view more debugging information. See below for instructions on configuring some common settings. For a full list of available settings, including experimental and debugging settings, [see here](https://cs.opensource.google/go/x/tools/+/refs/tags/gopls/v0.12.4:gopls/doc/settings.md).

Note: The code examples below are formatted for VSCode settings, which you can access by opening the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (Ctrl+Shift+P on Linux/Windows or Cmd+Shift+P on Mac OS) and searching for “settings.json.” The exact formatting will vary depending on your IDE, so please consult your IDE's documentation for settings preferences.


### Streamline code completion with usePlaceholders

The ‘usePlaceholders’ setting auto-completes a function’s name as well as example values for its parameters or struct fields. To configure this setting, make sure the default setting of “false” is changed to “true.” To enable placeholders in VS Code, add the following to your settings.json file: 


```
 "gopls": {
    "ui.completion.usePlaceholders": true,
  },

usePlaceholders type: boolean
usePlaceholders default: false
```

### Customize your build with buildFlags

The ‘buildFlags’ setting allows you to specify a set of custom build flags to the build system when invoked, allowing you greater control over the build process. A common use is to set -tags as a flag. To configure this setting in VS Code with tags of “example,”add the following to your settings.json file: 

```
"gopls": {
    "build.buildFlags": [
            "-tags=example"
        ]
  },

buildFlags type: []string
buildFlags default: []
```

### Exclude directories from the workspace with directoryFilters 

To exclude unwanted directories from your workspace when building, use directoryFilters. The default value for this setting includes all directories, and you can add filters by adding + to include and - to exclude, followed by a path prefix that corresponds to the workspace folder. The path prefix can be empty, so an initial - excludes everything.

`DirectoryFilters` also supports the `**` operator to match 0 or more directories.

For example, to exclude node_modules at current depth, your settings.json file in VS Code will include:

```
"gopls": {
    "build.directoryFilters": [
            "-node_modules"
        ]
  },
```

Other examples:

Exclude node_modules at any depth (this is the default value): `-**/node_modules`
Include only project_a: - (exclude everything), `+project_a`
Include only project_a, but not node_modules inside it: `-, +project_a, -project_a/node_modules`

directoryFilters type: []string
directoryFilters default: `["-**/node_modules"]`.

### Control hover text with hoverKind

The ‘hoverKind’ setting in gopls controls the type of information shown in hover text. You must choose one of the following settings:

*   "FullDocumentation"
*   "NoDocumentation"
*   "SingleLine"
*   "Structured" –  an experimental setting that returns a structured hover format. 
    This format separates the signature from the documentation, so that the client can do more manipulation of these fields. Only use this setting if your client supports it.
*   "SynopsisDocumentation" To shorten the hover text to a synopsis, change the default value 
    of ‘FullDocumentation’ to ‘SynopsisDocumentation’ in your settings.json file: 

```
 "gopls": {
    "ui.documentation.hoverKind": SynopsisDocumentation,
  },

hoverKind type: enum 
hoverKind default value: “FullDocumentation”
```

### Customize feedback with analyses 

This setting allows you to enable or disable various types of analyses. It takes a map of analysis pass names to enable or disable. For a full list of analyzers that gopls uses, see [analyzers.md](https://github.com/golang/tools/blob/master/gopls/doc/analyzers.md). For example, to check functions for unused parameters, enable the unusedparams analyzer by adding this to the settings.json file:


```
"gopls":
    "ui.diagnostic.analyses": {
        “unusedparams” : true
  },


analyses type: map[string]bool
analyses default: {}
```

