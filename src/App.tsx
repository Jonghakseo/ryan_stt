import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import Intro from './Views/Intro';
import Main from './Views/Main';
import Processing from './Views/Processing';
import Result from './Views/Result';

const AppWrapper = styled.div`
  color: #1b1a27;
  height: 100vh;
  width: 100vw;
  background-color: #235aff;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
`;

export default function App() {
  useEffect(() => {
    document.body.setAttribute(
      'style',
      'overflow:hidden; padding: 0; margin:0;'
    );
  }, []);

  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route path="/" component={Intro} exact />
          <Route path="/main" component={Main} exact />
          <Route path="/processing" component={Processing} exact />
          <Route path="/result" component={Result} exact />
        </Switch>
      </Router>
    </AppWrapper>
  );
}
