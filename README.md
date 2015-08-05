# RProxy

一个轻量级的代理工具，运行于命令行，专注于本地/远程文件替换，方便前端工程师的调试，提升效率。


> 本项目fork自[GoddyZhao/nproxy](https://github.com/goddyZhao/nproxy)，不过由于一些原因，GoddyZhao已经许久没有更新此工具，且同时在实际使用过程中，我也会有一些自己的需求。
> 本来准备给nproxy提MR，但是貌似给的反馈比较慢，而且考虑到提的MR可能不一定被采纳，所以最后决定基于nproxy，自己整一个专门给自己用的小工具。
> 以上就是此项目产生的原因，感谢[GoddyZhao/nproxy](https://github.com/goddyZhao/nproxy)！


下面是nproxy的说明文档。因为至目前为止做的二次开发改动并不大，所以并不打算重写说明文档。

------

# NProxy

A cli proxy tool specialized in file replacing

[![Build Status](https://secure.travis-ci.org/goddyZhao/nproxy.png)](http://travis-ci.org/goddyZhao/nproxy)

## Why NProxy

Maybe you have such question as why NProxy when we have [Fiddler](http://www.fiddler2.com/fiddler2/), [Charles](http://www.charlesproxy.com/), [Rythem](http://www.alloyteam.com/2012/05/web-front-end-tool-rythem-1/) and [Tinyproxy](https://banu.com/tinyproxy/). Yes, there is no doubt that they are all great tools, however they don't meet my requirements:

- Support Mac, Linux and Windows(especially Mac and Linux)
- Support replacing combo files with separated source files
- Support directory mapping

This is the main reason why NProxy is here. Besides, NProxy can improve the efficiency of my daily development for enterprise-level product with a bunch of complex building processes, which cost me lots of time.

I've written a post named [NProxy: The Mjolnir for UI Developers](http://en.blog.goddyzhao.me/post/29470818841/nproxy-the-mjolnir-for-ui-developers)  and a keynote [NProxy: A Sharp Weapon for UI Developers](https://speakerdeck.com/u/goddyzhao/p/nproxy-a-sharp-weapon-for-ui-developers) to explain my reason for developing NProxy in detail.

## Features

- Support Mac, Linux and Windows  
- Support both single file and combo file replacing
- Support directory mapping with any files
- Support both HTTP and HTTPS

## Installation

```
npm install -g nproxy (node >= v0.8.x is required)
```

If you are not familiar with Node.js and NPM, you can visit the [How to install NProxy](https://github.com/goddyZhao/nproxy/wiki/How-to-install-NProxy) wiki page to get detail information about installation of NProxy

## Usage
    
```
nproxy -l replace_rule.js 

Setting your browser's proxy to 127.0.0.1:port(8989 by default)
```

If you don't know how to set proxy for browser, please read this wiki: [How to set brower's proxy](https://github.com/goddyZhao/nproxy/wiki/How-to-set-browser's-proxy)


### More Options:

```
Usage: nproxy [options]

Options:

    -h, --help         output usage information
    -V, --version      output the version number
    -l, --list [list]  Specify the replace rule file
    -p, --port [port]  Specify the port nproxy will listen on(8989 by default)
    -t, --timeout [timeout] Specify the request timeout (5 seconds by default)
```

## Template of Replace Rule file(should be a .js file)

```
module.exports = [
    // 1. replace single file with local one
    {
      pattern: 'homepage.js',      // Match url you wanna replace
      responder:  "/home/goddyzhao/workspace/homepage.js"
    },

    // 2. replace single file with web file
    {
      pattern: 'homepage.js',      // Match url you wanna replace
      responder:  "http://www.anotherwebsite.com/assets/js/homepage2.js"
    },

    // 3. replace combo file with src with absolute file path
    {
      pattern: 'group/homepageTileFramework.*.js', 
      responder: [
        '/home/goddyzhao/workspace/webapp/ui/homepage/js/a.js',
        '/home/goddyzhao/workspace/webapp/ui/homepage/js/b.js',
        '/home/goddyzhao/workspace/webapp/ui/homepage/js/c.js'
      ] 
    },

    // 4. replace combo file with src with relative file path and specified dir
    {
      pattern: 'group/homepageTileFramework.*.js',
      responder: {
        dir: '/home/goddyzhao/workspace/webapp/ui/homepage/js',
        src: [
          'a.js',
          'b.js',
          'c.js'
        ]
      }
    },

    // 5. Map server image directory to local image directory
    {
      pattern: 'ui/homepage/img',  // must be a string
      responder: '/home/goddyzhao/image/' //must be a absolute directory path
    },

    // 6. Write responder with regular expression variables like $1, $2
    {
      pattern: /https?:\/\/[\w\.]*(?::\d+)?\/ui\/(.*)_dev\.(\w+)/,
      responder: 'http://localhost/proxy/$1.$2'
    },

    // 7. Map server image directory to local image directory with regular expression
    // This simple rule can replace multiple directories to corresponding locale ones
    // For Example, 
    //   http://host:port/ui/a/img/... => /home/a/image/...
    //   http://host:port/ui/b/img/... => /home/b/image/...
    //   http://host:port/ui/c/img/... => /home/c/image/...
    //   ...
    {
      pattern: /ui\/(.*)\/img\//,
      responder: '/home/$1/image/'
    }
];
```

You can use the [template file](https://github.com/goddyzhao/nproxy/blob/master/replace-rule.sample.js) and replace it with your own configurations. 

## Quickly setup rule files for SF project

For UI Developers from SuccessFactors, here is a bonus for you guys. You can use the [sf-transfer](http://goddyzhao.github.com/sf-transfer) tool to transfer the combo xml file to NProxy rule file automatically!

## License

NProxy is available under the terms of the MIT License

