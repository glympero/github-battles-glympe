var React = require('react');
var PropTypes = require('prop-types');
import SelectLanguage from './SelectLanguage';
var api = require('../utils/api');

function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}


class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    console.log(this.state.repos);
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage: lang,
        repos: null
      }
    });
    api.fetchPopularRepos(lang)
      .then(function(repos){
        this.setState(function(){
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage = {this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
      {!this.state.repos
        ? <p>Loading</p>
        : <RepoGrid repos={this.state.repos} />
      }
      </div>
    )
  }
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
module.exports = Popular;
