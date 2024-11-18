import { Candidate } from '../interfaces/Candidate.interface';


const searchGithub = async (): Promise<Candidate[]> => {
console.log(import.meta.env.VITE_GITHUB_TOKEN)

  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return data.map((user: any): Candidate => ({
      name: user.name || user.login,
      username: user.login,
      location: user.location || 'Unknown',
      avatar: user.avatar_url,
      email: user.email || null,
      html_url: user.html_url,
      company: user.company || 'Unknown',
    }));
  } catch (err) {
    console.error('An error occurred:', err);
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<Candidate | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    return {
      name: data.name || data.login,
      username: data.login,
      location: data.location || 'Unknown',
      avatar: data.avatar_url,
      email: data.email || null,
      html_url: data.html_url,
      company: data.company || 'Unknown',
    };
  } catch (err) {
    console.error('An error occurred:', err);
    return null;
  }
};

export { searchGithub, searchGithubUser };
