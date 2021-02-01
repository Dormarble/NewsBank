import dotenv from 'dotenv';

export default () => {
    try {
        dotenv.config({path: 'config.env'});
        console.log('load key successfully');
    } catch(err) {
        console.log('Error: there is problem at load config.env');
        console.log(err);  
        process.exit(1);
    }
}