import React, { useLayoutEffect } from "react";

import AppRoot from "../global/AppRoot";
import AppMain from "../global/AppMain";
import AppWrap from "../global/AppWrap";
import AppContent from "../global/AppContent";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LayoutProvider from "./LayoutProvider";

function Default({
  title,
  content,
  showSidebar = true,
  showHeader = true,
  ...props
}) {
  useLayoutEffect(() => {
    document.title = `${title}`;
  });

  return (
    <LayoutProvider>
      <AppRoot>
        <AppMain>
          {showSidebar && <Sidebar />}

          <AppWrap>
            {showHeader && <Header />}
            <AppContent content={content}>{props.children}</AppContent>
            <Footer />
          </AppWrap>
        </AppMain>
      </AppRoot>
    </LayoutProvider>
  );
}

export default Default;
