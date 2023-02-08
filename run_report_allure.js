const newman = require('newman');

newman.run({
    collection: './test.postman_collection.json', 
    environment: './test.postman_environment.json',
    reporters: ['cli', 'allure'], 
    insecure:true,
    iterationCount: 1,
    reporter: {
        allure: {
            export: './report'
        } 
    }
}, function(err, summary){
    if (err) {
        throw err;
    }

    const { total, pending, failed } = summary.run.stats.assertions;
    const { responseAverage, responseMin, responseMax, started, completed } = summary.run.timings;

    if(summary.run.failures && summary.run.failures.length>0){
        console.log("！！！Auto test Failed！！！");
        process.exit(1);
    }
    else{
        console.log("！！！Auto test Success！！！");
    }
});
