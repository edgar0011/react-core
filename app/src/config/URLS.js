/**
 * Created by edgar on 19/02/2017.
 */
export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export const USER_URL = id => `https://jsonplaceholder.typicode.com/users/${id}`;

export const TAG_URL = 'https://untitled-q8u4ikt67hva.runkit.sh/?words=1&num=100';
export const createTagUrl = (words = 3, num = 1) => `https://untitled-q8u4ikt67hva.runkit.sh/?words=${words}&num=${num}`;
