<!--{
  "Title": "Tutorial: Configure gopls",
  "Breadcrumb": true
}-->

Go’s language server, gopls, provides tooling support such as autocompletion, hover text, formatting, and diagnostics for any compatible editor. This article reviews how to install and configure gopls on your editor of choice.


## Prerequisites

*   **A recent version of Go**. We recommend one of the two latest versions, but, per 
    the [Go Release Policy](https://go.dev/doc/devel/release#policy), gopls tries to maintain support for the 
    [latest four versions](https://github.com/golang/tools/tree/master/gopls#supported-go-versions) of the language. 
    For installation instructions, see [Installing Go](/doc/install).

*   **Vim**. Download via [vim.org](http://vim.org). If you already have Vim, check the 
    [vim-go docs](https://github.com/fatih/vim-go/blob/master/README.md) to determine if you need to update Vim first to use the plugin.


## How to install gopls

To start using gopls, install an LSP plugin or extension in your editor of choice. With VS Code, for example, install the [VS Code Go extension](https://github.com/golang/vscode-go/blob/master/README.md), which provides rich language support for Go projects. See links to relevant plugins in other IDEs: 

*   [Vim/Neovim](https://github.com/golang/tools/blob/master/gopls/doc/vim.md)
*   [Emacs](https://github.com/golang/tools/blob/master/gopls/doc/emacs.md)
*   [Atom](https://github.com/MordFustang21/ide-gopls)
*   [Sublime Text](https://github.com/golang/tools/blob/master/gopls/doc/subl.md)
*   [Acme](https://github.com/fhs/acme-lsp)
*   [Lapce](https://github.com/lapce-community/lapce-go)


After you install a plugin and open a Go project, your IDE will prompt you about gopls. If you confirm you would like it installed, it will handle the process for you. 

If you wish to install gopls yourself, however, you can run the following:  

```
go install golang.org/x/tools/gopls@latest
```

## How to configure gopls

After you have installed gopls, you may choose to configure its settings depending on the type of information you wish to see. Below are instructions for configuring some of the most commonly used gopls settings. For a complete list of settings available with gopls, including experimental ones and ones intended for debugging purposes only, [see here](https://cs.opensource.google/go/x/tools/+/refs/tags/gopls/v0.12.4:gopls/doc/settings.md).

Note: the code examples provided below are formatted according to what would be required in the settings file in VS Code, which you can access by opening the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) (Ctrl+Shift+P on Linux/Windows or Cmd+Shift+P on Mac OS) and searching for “settings.json.”  Exact formatting will vary according to your IDE of choice, so be sure to check your IDE’s documentation for settings preferences.

### Streamline code completion with usePlaceholders

The ‘usePlaceholders’ setting auto-completes a function’s name as well as example values for its parameters or struct fields. To configure this setting, make sure the default setting of “false” is changed to “true.” To enable placeholders in VS Code, for example, your settings.json file should include the following: 

```
 "gopls": {
    "ui.completion.usePlaceholders": true,
  },

usePlaceholders type: boolean
usePlaceholders default: false
```

### Customize your build with buildFlags

The ‘buildFlags’ setting allows you to specify a set of custom build flags to the build system when invoked, allowing you greater control over the build process. A common use is to set -tags as a flag. To configure this setting in VS Code with tags of “example,” your settings.json file would include the following: 

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

When building, you may want to exclude unwanted directories from your workspace. You can do this using directoryFilters. The default value for this setting includes all directories, and you can add filters by adding + to include and - to exclude, followed by a path prefix that corresponds to the workspace folder. The path prefix can be empty, so an initial - excludes everything.
DirectoryFilters also supports the ** operator to match 0 or more directories.
For example, if you want to exclude node_modules at current depth, your settings.json file in VS Code might include:

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

The ‘hoverKind’ setting in gopls controls the type of information provided in the available hover text. You must choose the settings from one of the following:

*   "FullDocumentation"
*   "NoDocumentation"
*   "SingleLine"
*   "Structured" – an experimental setting that returns a structured hover format. This format separates the signature 
    from thedocumentation, so that the client can do more manipulation of these fields. This should only be used by clients that support this behavior.
*   "SynopsisDocumentation"


If you wish to shorten the hover text to a synopsis, for example, change the default value of `FullDocumentation` to `SynopsisDocumentation` so your settings.json file appears something like the following: 

```
 "gopls": {
    "ui.documentation.hoverKind": SynopsisDocumentation,
  },

hoverKind type: enum 
hoverKind default value: “FullDocumentation”
```

### Customize feedback with analyses 

This setting allows you to enable or disable various types of analyses. It takes in a map of the names of analysis passes to enable or disable. For a full list of analyzers that gopls uses, see [analyzers.md](https://github.com/golang/tools/blob/master/gopls/doc/analyzers.md). For example, if you wanted to check functions to see if there are any parameters being unused, you would enable the unusedparams analyzer by adding this to your settings.json file:

```
"gopls":
    "ui.diagnostic.analyses": {
        “unusedparams” : true
  },


analyses type: map[string]bool
analyses default: {}
```

