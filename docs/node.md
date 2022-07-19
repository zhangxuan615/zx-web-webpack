# path.join 与 path.resolve 区别

1. path.join 单纯的将字符串路径拼接在一起，不会使用路径查找规则

```javascript
path.join('/a', 'b', 'c'); // /a/b/c
path.join('a', 'b', 'c'); // a/b/c
path.join('./a', 'b', 'c'); // a/b/c
path.join('../a', 'b', 'c'); // ../a/b/c
path.join('./../a', 'b', 'c'); // ../a/b/c

path.join('a', '/b', 'c'); // a/b/c
path.join('a', 'b', 'c'); // a/b/c
path.join('a', './b', 'c'); // a/b/c
path.join('a', '../b', 'c'); // b/c
path.join('a', './../b', 'c'); // b/c
path.join('a', '../../b', 'c'); // ../b/c

path.join('a', 'b', '../../c'); // c
path.join('a', 'b', '../../../c'); // ../c
path.join('a', 'b', '../../../../c'); // ../../c

path.join('a:/b', "c");  // a:/b/c
```

按照顺序依照path特性拼接路径字符串，最前面按需保留 `../`，但不会保留 `./`

2. path.resolve 始终解析为完整的绝对路径

以当前文件路径 `__dirname` 作为起始路径开始按照路径解析规则计算路径，遇到 `/` 则即表示重置到根路径

```javascript
path.resolve('/a'); // E:\a
path.resolve('a'); // E:\zx\zx-web-webpack-2\a
path.resolve('./a'); // E:\zx\zx-web-webpack-2\a
path.resolve('../a'); // E:\zx\a

path.resolve('a', '/b'); // E:\b
path.resolve('a', 'b'); // E:\zx\zx-web-webpack-2\a\b
path.resolve('a', './b'); // E:\zx\zx-web-webpack-2\a\b
path.resolve('a', '../b'); // E:\zx\zx-web-webpack-2\b
```

