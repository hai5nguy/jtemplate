import store from 'store'
// import { KoalaApi } from 'Actions';
const { dispatch } = store

export const getLeaderboard = async () => {
    const data = await KoalaApi.send('query { leaderboard { givenName familyName points } }');
    const { leaderboard } = data;
    dispatch({
        type: 'LEADERBOARD_SET',
        leaderboard,
    });
};


const getScore = async () => {
    const data = await KoalaApi.send('query { getScore { score } }');
    const { score } = data.getScore;
    dispatch({
        type: 'USER_SET',
        user: { score: 2 },
    });
};
