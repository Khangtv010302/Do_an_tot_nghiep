import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=a532b77e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=a532b77e"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=a532b77e"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import App from "/src/App.jsx?t=1715141472128";
import "/src/index.css";
import { BrowserRouter, Routes, Route } from "/node_modules/.vite/deps/react-router-dom.js?v=a532b77e";
import Home from "/src/home/Home.jsx?t=1715141472128";
import Type from "/src/type/type.jsx?t=1715141472128";
import Staff from "/src/staff/Staff.jsx?t=1715141472128";
import Manufacturer from "/src/manufacturer/Manufacturer.jsx?t=1715141472128";
import Vaccine from "/src/vaccine/vaccine.jsx?t=1715141472128";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "/node_modules/.vite/deps/@tanstack_react-query.js?v=a532b77e";
import Object from "/src/object/Object.jsx?t=1715141472128";
import Schedule from "/src/schedule/Schedule.jsx?t=1715141472128";
import Login from "/src/login/Login.jsx";
import Test from "/src/test/test.jsx?t=1715155314420";
import Plan from "/src/plan/Plan.jsx?t=1715152635658";
import Storage from "/src/storage/storage.jsx?t=1715155167004";
import UnitDelivering from "/src/unit_delivering/UnitDelivering.jsx?t=1715142225738";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(BrowserRouter, { children: /* @__PURE__ */ jsxDEV(Routes, { children: [
    /* @__PURE__ */ jsxDEV(Route, { path: "/", element: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 31,
      columnNumber: 36
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 31,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Login", element: /* @__PURE__ */ jsxDEV(Login, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 32,
      columnNumber: 41
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 32,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Home", element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 33,
      columnNumber: 40
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 33,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Type", element: /* @__PURE__ */ jsxDEV(Type, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 34,
      columnNumber: 40
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 34,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Staff", element: /* @__PURE__ */ jsxDEV(Staff, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 35,
      columnNumber: 41
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 35,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Manufacturer", element: /* @__PURE__ */ jsxDEV(Manufacturer, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 36,
      columnNumber: 48
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 36,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Vaccine", element: /* @__PURE__ */ jsxDEV(Vaccine, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 37,
      columnNumber: 43
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 37,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Object", element: /* @__PURE__ */ jsxDEV(Object, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 38,
      columnNumber: 42
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 38,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Storage", element: /* @__PURE__ */ jsxDEV(Storage, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 39,
      columnNumber: 43
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 39,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Schedule", element: /* @__PURE__ */ jsxDEV(Schedule, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 40,
      columnNumber: 44
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 40,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Plan", element: /* @__PURE__ */ jsxDEV(Plan, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 41,
      columnNumber: 40
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 41,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/UnitDelivering", element: /* @__PURE__ */ jsxDEV(UnitDelivering, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 42,
      columnNumber: 50
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 42,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { path: "/Test", element: /* @__PURE__ */ jsxDEV(Test, {}, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 43,
      columnNumber: 40
    }, this) }, void 0, false, {
      fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
      lineNumber: 43,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
    lineNumber: 30,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
    lineNumber: 29,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
    lineNumber: 28,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/Do an tot nghiep/Code/Do_an_tot_nghiep/vaccine-ui/src/main.jsx",
    lineNumber: 27,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,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QUFBLFdBQXlEO0FBQUEsSUFDekQsdUJBQUMsU0FBTSxNQUFLLFNBQVEsU0FBUyx1QkFBQyxVQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBSyxLQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQXNDO0FBQUEsT0FieEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWNBLEtBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWdCQSxLQWpCQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa0JBLEtBbkJKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FvQkE7QUFDRiIsIm5hbWVzIjpbIlJlYWN0IiwiUmVhY3RET00iLCJBcHAiLCJCcm93c2VyUm91dGVyIiwiUm91dGVzIiwiUm91dGUiLCJIb21lIiwiVHlwZSIsIlN0YWZmIiwiTWFudWZhY3R1cmVyIiwiVmFjY2luZSIsInVzZVF1ZXJ5IiwidXNlUXVlcnlDbGllbnQiLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJPYmplY3QiLCJTY2hlZHVsZSIsIkxvZ2luIiwiVGVzdCIsIlBsYW4iLCJTdG9yYWdlIiwiVW5pdERlbGl2ZXJpbmciLCJxdWVyeUNsaWVudCIsImNyZWF0ZVJvb3QiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qc3gnXG5pbXBvcnQgJy4vaW5kZXguY3NzJ1xuaW1wb3J0IHsgQnJvd3NlclJvdXRlciwgUm91dGVzLCBSb3V0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXG5pbXBvcnQgSG9tZSBmcm9tICcuL2hvbWUvSG9tZS5qc3gnXG5pbXBvcnQgVHlwZSBmcm9tICcuL3R5cGUvdHlwZS5qc3gnXG5pbXBvcnQgU3RhZmYgZnJvbSAnLi9zdGFmZi9TdGFmZi5qc3gnXG5pbXBvcnQgTWFudWZhY3R1cmVyIGZyb20gJy4vbWFudWZhY3R1cmVyL01hbnVmYWN0dXJlci5qc3gnXG5pbXBvcnQgVmFjY2luZSBmcm9tICcuL3ZhY2NpbmUvdmFjY2luZS5qc3gnXG5pbXBvcnQge1xuICB1c2VRdWVyeSxcbiAgdXNlUXVlcnlDbGllbnQsXG4gIFF1ZXJ5Q2xpZW50LFxuICBRdWVyeUNsaWVudFByb3ZpZGVyLFxufSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknXG5pbXBvcnQgT2JqZWN0IGZyb20gJy4vb2JqZWN0L09iamVjdC5qc3gnXG5pbXBvcnQgU2NoZWR1bGUgZnJvbSAnLi9zY2hlZHVsZS9TY2hlZHVsZS5qc3gnXG5pbXBvcnQgTG9naW4gZnJvbSAnLi9sb2dpbi9Mb2dpbi5qc3gnXG5pbXBvcnQgVGVzdCBmcm9tICcuL3Rlc3QvdGVzdC5qc3gnXG5pbXBvcnQgUGxhbiBmcm9tICcuL3BsYW4vUGxhbi5qc3gnXG5pbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZS5qc3gnXG5pbXBvcnQgVW5pdERlbGl2ZXJpbmcgZnJvbSAnLi91bml0X2RlbGl2ZXJpbmcvVW5pdERlbGl2ZXJpbmcuanN4J1xuXG5jb25zdCBxdWVyeUNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpXG5SZWFjdERPTS5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpLnJlbmRlcihcbiAgPFJlYWN0LlN0cmljdE1vZGU+XG4gICAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cbiAgICAgIDxCcm93c2VyUm91dGVyPlxuICAgICAgICA8Um91dGVzPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPScvJyBlbGVtZW50PXs8QXBwLz59PjwvUm91dGU+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9Jy9Mb2dpbicgZWxlbWVudD17PExvZ2luLz59PjwvUm91dGU+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9Jy9Ib21lJyBlbGVtZW50PXs8SG9tZS8+fT48L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPScvVHlwZScgZWxlbWVudD17PFR5cGUvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL1N0YWZmJyBlbGVtZW50PXs8U3RhZmYvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL01hbnVmYWN0dXJlcicgZWxlbWVudD17PE1hbnVmYWN0dXJlci8+fT48L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPScvVmFjY2luZScgZWxlbWVudD17PFZhY2NpbmUvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL09iamVjdCcgZWxlbWVudD17PE9iamVjdC8+fT48L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPScvU3RvcmFnZScgZWxlbWVudD17PFN0b3JhZ2UvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL1NjaGVkdWxlJyBlbGVtZW50PXs8U2NoZWR1bGUvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL1BsYW4nIGVsZW1lbnQ9ezxQbGFuLz59PjwvUm91dGU+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9Jy9Vbml0RGVsaXZlcmluZydlbGVtZW50PXs8VW5pdERlbGl2ZXJpbmcvPn0+PC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD0nL1Rlc3QnIGVsZW1lbnQ9ezxUZXN0Lz59PjwvUm91dGU+XG4gICAgICAgIDwvUm91dGVzPlxuICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICA8L1JlYWN0LlN0cmljdE1vZGU+LFxuKVxuIl0sImZpbGUiOiJEOi9EbyBhbiB0b3QgbmdoaWVwL0NvZGUvRG9fYW5fdG90X25naGllcC92YWNjaW5lLXVpL3NyYy9tYWluLmpzeCJ9