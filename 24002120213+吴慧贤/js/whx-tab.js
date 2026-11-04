// ============================================================
// 新闻选项卡 · 可复用选项卡组件（作者：吴慧贤，2026-11-04）
// 用法：whxInitTabs(选项卡容器元素, 切换回调)
// 组件不依赖具体页面结构，可同时初始化页面中的多组选项卡
// ============================================================

// 初始化一组选项卡：为每个选项卡按钮绑定点击监听事件，并选中默认项（可复用）
function whxInitTabs(whxTabsEl, whxOnTabChange) {
  var whxBtns = whxTabsEl.querySelectorAll('.whx-tab-btn');

  // 为每个选项卡按钮绑定点击监听事件
  whxBtns.forEach(function (whxBtn) {
    whxBtn.addEventListener('click', function () {
      // 先清除所有选项卡的选中状态，再设置当前元素的选中状态
      whxSelectTab(whxTabsEl, whxBtn);
      // 切换后执行调用方传入的回调（如联动内容面板）
      if (typeof whxOnTabChange === 'function') {
        whxOnTabChange(whxBtn);
      }
    });
  });

  // 页面加载时选中默认选项卡（HTML 中标记 whx-active 的那一项，默认为第一个）
  whxSelectTab(whxTabsEl, whxTabsEl.querySelector('.whx-tab-btn.whx-active') || whxBtns[0]);
}

// 先清除所有选项卡的选中状态，然后再设置当前元素的选中状态
function whxSelectTab(whxTabsEl, whxTargetBtn) {
  // 第一步：清除所有选项卡的选中状态
  whxTabsEl.querySelectorAll('.whx-tab-btn').forEach(function (whxBtn) {
    whxBtn.classList.remove('whx-active');
    whxBtn.setAttribute('aria-selected', 'false');
  });

  // 第二步：设置当前元素的选中状态
  whxTargetBtn.classList.add('whx-active');
  whxTargetBtn.setAttribute('aria-selected', 'true');
}

// ============================================================
// 本页调用：初始化新闻选项卡，切换时联动显示对应的内容面板
// ============================================================

// 根据选中选项卡的 data-whx-tab 值，切换显示对应的内容面板
whxInitTabs(document.getElementById('whx-news-tabs'), function (whxBtn) {
  var whxKey = whxBtn.dataset.whxTab;

  // 遍历全部面板，仅显示与当前选项卡对应的面板
  document.querySelectorAll('.whx-panel').forEach(function (whxPanel) {
    whxPanel.hidden = whxPanel.dataset.whxPanel !== whxKey;
  });
});
