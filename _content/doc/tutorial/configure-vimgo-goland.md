<!--{
  "Title": "Tutorial: Configure Vim for Go Development",
  "Breadcrumb": true
}-->

This page describes how to configure Vim for Go development, using the [Vim-go plugin](https://github.com/fatih/vim-go). The plugin offers a variety of features, including syntax highlighting, autocompletion support via gopls, code linting, and more. 

## Prerequisites {#prerequisites}

*   **Go**. The latest stable release of the language is preferable.
    For installation instructions, see [installing Go](/doc/install).
*   **Vim**. Download via [vim.org](http://vim.org). If you already have Vim, check the 
    [vim-go docs](https://github.com/fatih/vim-go/blob/master/README.md) to determine if you need to update Vim first to use the plugin.


## How to set up the Vim-go Plugin 

1.  **Install the latest stable release of vim-go** 
    via [this link](https://github.com/fatih/vim-go/releases/tag/v1.28). If you are using the package manager Vim Packages 8, use the helper line below to install vim-go:
    
    ```
    git clone https://github.com/fatih/vim-go.git ~/.vim/pack/plugins/start/vim-go
    ```

    If you are using another package manager, consult [this list](https://github.com/fatih/vim-go#install) to determine which helper line you should use. 

2.  **Install the necessary binaries**. Use the vim-go command `:GoInstallBinaries`, 
    which will `go install` all the required binaries. Alternatively, you can insert the following lines into your vimrc file, save the file, and then install the vim-go plugin by running:

    ```
    vim +PlugInstall:
    call plug#begin() Plug 'fatih/vim-go', { 'do': 
    ':GoUpdateBinaries' } call plug#end()
    ```

3.  **Familiarize yourself with vim-go’s commands**.
    See the full list of commands and settings [here](https://github.com/fatih/vim-go/blob/master/doc/vim-go.txt). Some examples of popular commands include:

    *   `:GoImport[!] [path]` - Ensures that the provided package {path} is imported in the current Go buffer, using proper style and ordering. If {path} is already being imported, an error will be displayed and the buffer will be untouched. If [!] is given it will download the package with `go get`

    *   `:GoBuild[!] [expand]` - Build your packages with GoBuild. You may optionally pass any valid go build flags/options. For a full list please see `go help build`.

    *   See which code is covered by tests with `:GoCoverage[!] [options]`. Creates a coverage profile and annotates the current file's source code.


## GoLand IDE and Go plugin

*   [Download the GoLand IDE](https://www.jetbrains.com/go/download/#section=mac) on jetbrains.com.
*   [Install the Go plugin](https://plugins.jetbrains.com/plugin/9568-go) via the Jetbrains marketplace.
