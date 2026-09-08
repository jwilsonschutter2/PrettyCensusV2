/** PrettyCensus workflow layout and mutually exclusive accordion behavior. */
(function () {
  "use strict";

  const $id = id => document.getElementById(id);
  const TOP_LEVEL = ["fetchWorkflowPanel", "comparisonPanel", "mappingPanel"];

  function shown(node) {
    return node && node.style.display !== "none" && !node.hidden;
  }

  function setExpanded(button, open) {
    if (!button) return;
    button.setAttribute("aria-expanded", String(open));
    button.classList.toggle("active", open);
  }

  function closeWorkflow(panelId) {
    const panel = $id(panelId);
    if (!panel) return;
    panel.style.display = "none";
    setExpanded(document.querySelector(`[aria-controls="${panelId}"]`), false);
    if (panelId === "mappingPanel" && window.prettyCensusMap && typeof window.prettyCensusMap.resize === "function") {
      window.prettyCensusMap.resize();
    }
  }

  function closeAllExcept(exceptionId) {
    TOP_LEVEL.forEach(id => {
      if (id !== exceptionId) closeWorkflow(id);
    });
  }

  function openWorkflow(panelId, options) {
    const panel = $id(panelId);
    if (!panel) return;
    const wasOpen = shown(panel);
    closeAllExcept(wasOpen ? null : panelId);
    panel.style.display = wasOpen ? "none" : "block";
    const trigger = document.querySelector(`[aria-controls="${panelId}"]`);
    setExpanded(trigger, !wasOpen);

    if (!wasOpen) {
      if (options && options.populateComparison && typeof populateComparisonTopicOptions === "function") {
        populateComparisonTopicOptions();
      }
      if (options && options.populateMap && typeof window.prettyCensusPopulateMapVariables === "function") {
        window.prettyCensusPopulateMapVariables();
      }
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      window.setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
    }
  }

  function makeHeaderButton(id, label, panelId) {
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.className = "workflow-toggle";
    button.textContent = label;
    button.setAttribute("aria-controls", panelId);
    button.setAttribute("aria-expanded", "false");
    return button;
  }

  function makePanel(id, label) {
    const panel = document.createElement("section");
    panel.id = id;
    panel.className = "tool-panel workflow-panel";
    panel.style.display = "none";
    panel.setAttribute("aria-label", label);
    return panel;
  }

  function moveFetchControls(runArea) {
    const generate = $id("generateURL");
    const fetch = $id("fetchJSON");
    const exportCsv = $id("exportCurrentCsvBtn");
    const urlContainer = $id("urlContainer");
    const tableContainer = $id("jsonTableContainer");
    if (!fetch || !runArea) return;

    let toggle = $id("fetchWorkflowToggle");
    let panel = $id("fetchWorkflowPanel");
    if (!toggle) {
     toggle = makeHeaderButton(
    "fetchWorkflowToggle",
    "Fetch JSON & Display Table",
    "fetchWorkflowPanel"
       );

     const runHeading = runArea.querySelector(".section-title");

       if (runHeading) {
         runHeading.insertAdjacentElement("afterend", toggle);
         } else {
         runArea.prepend(toggle);
         }
    }
    if (!panel) {
      panel = makePanel("fetchWorkflowPanel", "Fetch JSON and display table");
      toggle.insertAdjacentElement("afterend", panel);
    }

    const actions = document.createElement("div");
    actions.className = "workflow-subactions";
    if (fetch) {
      fetch.textContent = "Fetch JSON & Display Table";
      actions.appendChild(fetch);
    }
    if (generate) {
      generate.textContent = "Generate Census API URL";
      generate.classList.add("secondary-button");
      actions.appendChild(generate);
    }
    if (exportCsv) actions.appendChild(exportCsv);
    panel.appendChild(actions);
    if (urlContainer) panel.appendChild(urlContainer);
    if (tableContainer) panel.appendChild(tableContainer);

    toggle.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openWorkflow("fetchWorkflowPanel");
    }, true);
  }

  function organizeComparison(runArea) {
    const trigger = $id("comparisonOptionBtn");
    const panel = $id("comparisonPanel");
    const changeButton = $id("createChangeMapBtn");
    const changePanel = $id("changeMapPanel");
    const jsonDetails = $id("comparisonJsonDetails");
    const comparisonTable = $id("comparisonTableContainer");
    if (!trigger || !panel || !runArea) return;

    trigger.textContent = "Compare to Another Year";
    trigger.classList.add("workflow-toggle");
    trigger.setAttribute("aria-controls", "comparisonPanel");
    trigger.setAttribute("aria-expanded", "false");
    runArea.appendChild(trigger);
    runArea.appendChild(panel);

    let outputActions = $id("comparisonOutputActions");
    if (!outputActions) {
      outputActions = document.createElement("div");
      outputActions.id = "comparisonOutputActions";
      outputActions.className = "workflow-subactions comparison-output-actions";

      if (changeButton) {
        changeButton.textContent = "Create Change Map";
        changeButton.classList.add("primary-option");
        outputActions.appendChild(changeButton);
      }

      const tableButton = document.createElement("button");
      tableButton.type = "button";
      tableButton.id = "showComparisonTableBtn";
      tableButton.className = "secondary-button";
      tableButton.textContent = "JSON Table";
      tableButton.disabled = true;
      outputActions.appendChild(tableButton);

      const jsonButton = document.createElement("button");
      jsonButton.type = "button";
      jsonButton.id = "showComparisonJsonBtn";
      jsonButton.className = "secondary-button";
      jsonButton.textContent = "Raw JSON";
      jsonButton.disabled = true;
      outputActions.appendChild(jsonButton);

      const outputAnchor = $id("comparisonUrls") || panel.lastElementChild;
      outputAnchor.insertAdjacentElement("afterend", outputActions);

      tableButton.addEventListener("click", () => {
        if (comparisonTable) comparisonTable.style.display = "block";
        if (jsonDetails) jsonDetails.style.display = "none";
        tableButton.classList.add("active-view");
        jsonButton.classList.remove("active-view");
      });
      jsonButton.addEventListener("click", () => {
        if (comparisonTable) comparisonTable.style.display = "none";
        if (jsonDetails) jsonDetails.style.display = "block";
        jsonButton.classList.add("active-view");
        tableButton.classList.remove("active-view");
      });

      const observerTarget = comparisonTable || panel;
      new MutationObserver(() => {
        const hasResults = Boolean(comparisonTable && comparisonTable.textContent.trim());
        tableButton.disabled = !hasResults;
        jsonButton.disabled = !hasResults;
        if (hasResults && !tableButton.classList.contains("active-view") && !jsonButton.classList.contains("active-view")) {
          tableButton.click();
        }
      }).observe(observerTarget, { childList: true, subtree: true, characterData: true });
    }

    if (changePanel && changePanel.parentElement !== panel) panel.appendChild(changePanel);

    trigger.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openWorkflow("comparisonPanel", { populateComparison: true });
    }, true);

    if (changeButton && changePanel) {
      changeButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        const open = shown(changePanel);
        changePanel.style.display = open ? "none" : "block";
        changeButton.setAttribute("aria-expanded", String(!open));
        if (!open) {
          changePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
          window.setTimeout(() => window.dispatchEvent(new Event("resize")), 0);
        }
      }, true);
    }
  }

  function organizeMapping(runArea) {
    const trigger = $id("mappingOptionBtn");
    const panel = $id("mappingPanel");
    if (!trigger || !panel || !runArea) return;
    trigger.textContent = "Mapping Option";
    trigger.classList.add("workflow-toggle");
    trigger.setAttribute("aria-controls", "mappingPanel");
    trigger.setAttribute("aria-expanded", "false");
    runArea.appendChild(trigger);
    runArea.appendChild(panel);

    trigger.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openWorkflow("mappingPanel", { populateMap: true });
    }, true);
  }

  function wireCloseButtons() {
    const pairs = [
      ["closeComparisonPanelBtn", "comparisonPanel"],
      ["closeMappingPanelBtn", "mappingPanel"]
    ];
    pairs.forEach(([buttonId, panelId]) => {
      const button = $id(buttonId);
      if (!button) return;
      button.addEventListener("click", event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeWorkflow(panelId);
      }, true);
    });

    const closeChange = $id("closeChangeMapPanelBtn");
    if (closeChange) closeChange.addEventListener("click", event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const panel = $id("changeMapPanel");
      if (panel) panel.style.display = "none";
      setExpanded($id("createChangeMapBtn"), false);
    }, true);
  }

  function init() {
    const firstAction = $id("generateURL") || $id("fetchJSON") || $id("comparisonOptionBtn");
    const runArea = firstAction && firstAction.closest(".card");
    if (!runArea) return;

    runArea.classList.add("workflow-accordion");
    moveFetchControls(runArea);
    organizeComparison(runArea);
    organizeMapping(runArea);
    wireCloseButtons();
    closeAllExcept(null);

    const looseChangeButton = $id("createChangeMapBtn");
    if (looseChangeButton && looseChangeButton.parentElement === runArea) looseChangeButton.remove();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
