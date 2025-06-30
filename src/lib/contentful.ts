import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master',
});

export interface ContentfulProject {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    description: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    category: string;
    featured?: boolean;
  };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured?: boolean;
}

export const getProjects = async (): Promise<Project[]> => {
  try {
    const response = await client.getEntries<ContentfulProject['fields']>({
      content_type: 'projects', // Updated to match your Contentful content type ID
      order: '-sys.createdAt', // Order by creation date, newest first
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      image: `https:${item.fields.image.fields.file.url}`,
      technologies: item.fields.technologies || [],
      liveUrl: item.fields.liveUrl,
      githubUrl: item.fields.githubUrl,
      category: item.fields.category,
      featured: item.fields.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching projects from Contentful:', error);
    throw error;
  }
};

export default client;