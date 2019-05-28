import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MediaQuery from 'react-responsive';
import './HelloPage.scss';
import { fetchUser } from '../actions/user';

const mapStateToProps = (state, props) => {
  return {
    user: state.user.get('user').toJS()
  };
};

class HelloPage extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchUser('wlchn'));
  }

  public render() {
    return (
      <div className="HelloPage">
        <Helmet>
          <title>razzle-redux-typescript-example</title>
          <meta name="description" content="blabla" />
          <meta name="keywords" content="bla, blabla" />
        </Helmet>
        <MediaQuery minWidth={768}>{this.renderDesktop()}</MediaQuery>
        <MediaQuery maxWidth={767}>{this.renderMobile()}</MediaQuery>
      </div>
    );
  }

  public renderDesktop() {
    return this.renderDemo();
  }

  public renderMobile() {
    return this.renderDemo();
  }

  public renderDemo() {
    const { user } = this.props;
    return (
      <div>
        hello
        <div>{user.login}</div>
        <div>{user.name}</div>
        <img className="avatar" src={user.avatar_url} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HelloPage);
