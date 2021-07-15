const core = require("@actions/core");
const { Octokit } = require("@octokit/rest");
const trueContributorsMixin = require("true-github-contributors");
const _ = require('lodash');


Object.assign(Octokit.prototype, trueContributorsMixin);
const octokit = new Octokit({ auth: process.env.token });


(async function main(){


  const today = new Date();
  // const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
  const dayAgo = new Date(today.setDate(today.getDate() - 1));

  const contributorsList = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'alexeysergeev-cm',
    repo: 'website',
    since: dayAgo.toISOString()
  })


  for(const contributorInfo of contributorsList.data){
    console.log(contributorInfo.author.login)
    console.log(contributorInfo.commit.author)
    console.log(contributorInfo.commit.message)
  }

  const commentsContr = await octokit.request('GET /repos/{owner}/{repo}/issues/comments', {
    owner: 'alexeysergeev-cm',
    repo: 'website',
    since: dayAgo.toISOString()
  })

  for(const contributorInfo of commentsContr.data){
    console.log(contributorInfo.user.login)
  }
  
  // const teamsHFLA = await octokit.request('GET /orgs/{org}/teams', {
  //   org: 'hackforla'
  // })
  // console.log(teamsHFLA)
})()