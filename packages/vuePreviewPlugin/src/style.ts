const style = `<style>
  .flex-demo-wrapper {
    display: flex;
    padding: 10px 20px;
    border: 1px solid var(--vp-c-border);
    margin-bottom: 10px;
  }

  .flex-demo-item {
    background-color: var(--vp-code-block-bg);
    color: var(--vp-code-block-color);
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;
    margin: 4px;
  }
  .flex-demo-item:nth-child(odd) {
    background-color: var(--vp-c-bg);
  }

  .flex-demo-item:nth-child(even) {
    background-color: var(--vp-c-bg-soft);
  }

    .grid-demo-wrapper .grid-item {
      color: #fff;
      font-size: 2em;
      text-align: center;
      border: 1px solid var(--vp-c-border);
    }
    .grid-demo-wrapper .grid-item:nth-child(even) {
      background: var(--vp-c-yellow-1);
    }
    .grid-demo-wrapper .grid-item:nth-child(odd) {
      background: var(--vp-c-green-1);
    }
  }
</style>`

export default style
