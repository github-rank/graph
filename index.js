'use strict';

const _ = require('lodash');
const db = require('./db.json');
const users = _.map(db.users, user => ({
	id: user.name,
	group: 1
}));
const repos = _.map(db.users, user => {
	return _.map(user.repos, repo => ({
		id: repo.name,
		group: 2
	}));
});
const nodes = _.concat(users, _.flatten(repos));
const links = _.map(db.users, user => {
	return _.reduce(user.repos, (result, repo) => {
		result.push({
			source: user.name,
			target: repo.name
		});

		return result;
	}, []);
});
const data = {
	nodes: nodes,
	links: _.flatten(links)
};
const fs = require('fs');

fs.writeFileSync('miserables.json', JSON.stringify(data));
