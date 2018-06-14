`shortcut for --optimize-minimize --define process.env.NODE_ENV="production"`
-p 会自动在命令行的后面加上--optimize-minimize和--define process.env.NODE_ENV="production"
--optimize-minimize会自动调用UglifyJSPlugin，--define process.env.NODE_ENV="'production'"会把process.env.NODE_ENV变量的值设置为production。部分库在设置为production下会进行进一步的代码优化。
一句话概括就是-p会为生产条件自动做出优化。
`https://tee1365.github.io/react-demo/build/index.html`
