import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// Helper function to check if GraphQL API is properly configured
const isGraphQLConfigured = () => {
  return graphqlAPI && graphqlAPI.trim() !== '';
};

// Helper function to check if REST API is properly configured
const isRestApiConfigured = () => {
  return apiBaseUrl && apiBaseUrl.trim() !== '';
};

// Mock data for development/testing when no API is configured
const mockPosts = [
  {
    node: {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2023',
      excerpt: 'Explore the latest trends and technologies that are shaping the future of web development in 2023 and beyond.',
      createdAt: '2023-01-15T00:00:00Z',
      slug: 'future-of-web-development-2023',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80'
      },
      author: {
        name: 'Alex Johnson',
        bio: 'Senior Frontend Developer with 8 years of experience in React and modern JavaScript frameworks.',
        photo: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Technology', slug: 'technology' },
        { name: 'Web Development', slug: 'web-development' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The web development landscape is constantly evolving, with new technologies and frameworks emerging regularly. In 2023, several key trends are shaping the future of how we build web applications.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Progressive Web Apps (PWAs)',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'PWAs continue to gain traction as they offer app-like experiences directly in the browser. With improved performance and offline capabilities, PWAs bridge the gap between web and native applications.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Server-Side Rendering (SSR) and Static Site Generation (SSG)',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Frameworks like Next.js and Nuxt.js have made SSR and SSG more accessible. These approaches improve SEO, performance, and user experience by delivering pre-rendered content.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '2',
      title: 'Mastering React Hooks: A Complete Guide',
      excerpt: 'Learn how to use React Hooks effectively to build more efficient and maintainable React applications.',
      createdAt: '2023-02-20T00:00:00Z',
      slug: 'mastering-react-hooks',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'Sarah Williams',
        bio: 'React specialist and author of several popular React courses.',
        photo: {
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80'
        }
      },
      categories: [
        { name: 'React', slug: 'react' },
        { name: 'JavaScript', slug: 'javascript' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'React Hooks have revolutionized how we write React components. They allow us to use state and other React features without writing a class component.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'useState Hook',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The useState hook is the most fundamental hook in React. It allows you to add state to functional components.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'useEffect Hook',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '3',
      title: 'Building Scalable APIs with Node.js and Express',
      excerpt: 'A comprehensive guide to creating robust and scalable APIs using Node.js and Express framework.',
      createdAt: '2023-03-10T00:00:00Z',
      slug: 'building-scalable-apis-nodejs-express',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80'
      },
      author: {
        name: 'Michael Chen',
        bio: 'Backend engineer with expertise in Node.js, Python, and distributed systems.',
        photo: {
          url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Node.js', slug: 'nodejs' },
        { name: 'API', slug: 'api' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Node.js has become one of the most popular choices for building scalable APIs. Combined with Express, it provides a powerful yet simple framework for creating RESTful services.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Setting Up Your Project',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'To get started with Node.js and Express, you\'ll need to initialize your project and install the necessary dependencies.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Creating Routes',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Express makes it easy to define routes for your API. You can create GET, POST, PUT, and DELETE endpoints with minimal code.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '4',
      title: 'CSS Grid vs Flexbox: When to Use Which',
      excerpt: 'Understanding the differences between CSS Grid and Flexbox and knowing when to use each layout method.',
      createdAt: '2023-04-05T00:00:00Z',
      slug: 'css-grid-vs-flexbox',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1633356122544-f1575931d73e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'Emma Rodriguez',
        bio: 'Frontend architect specializing in CSS and responsive design.',
        photo: {
          url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'CSS', slug: 'css' },
        { name: 'Web Design', slug: 'web-design' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'CSS Grid and Flexbox are both powerful layout systems in CSS, but they serve different purposes. Understanding when to use each is crucial for efficient web development.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'CSS Grid: Two-Dimensional Layout',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'CSS Grid is ideal for creating complex layouts that require control over both rows and columns. It\'s perfect for overall page layouts and complex component designs.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Flexbox: One-Dimensional Layout',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Flexbox excels at distributing space along a single axis, either horizontally or vertically. It\'s perfect for aligning items within a container and creating responsive navigation bars.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '5',
      title: 'Introduction to Machine Learning with Python',
      excerpt: 'Get started with machine learning using Python and popular libraries like scikit-learn and TensorFlow.',
      createdAt: '2023-05-12T00:00:00Z',
      slug: 'introduction-to-machine-learning-python',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'David Kim',
        bio: 'Data scientist and machine learning engineer with 6 years of experience.',
        photo: {
          url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Machine Learning', slug: 'machine-learning' },
        { name: 'Python', slug: 'python' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Machine learning is transforming industries by enabling computers to learn from data and make predictions or decisions without being explicitly programmed.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Getting Started with Python',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Python has become the go-to language for machine learning due to its simplicity and the rich ecosystem of libraries like NumPy, Pandas, and scikit-learn.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Popular Libraries',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Scikit-learn provides simple and efficient tools for data mining and data analysis. TensorFlow and PyTorch are popular choices for deep learning applications.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '6',
      title: 'The Art of UI/UX Design: Principles for Better User Experience',
      excerpt: 'Learn the fundamental principles of UI/UX design to create more intuitive and user-friendly interfaces.',
      createdAt: '2023-06-18T00:00:00Z',
      slug: 'art-of-ui-ux-design',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80'
      },
      author: {
        name: 'Olivia Parker',
        bio: 'UI/UX designer with a passion for creating beautiful and functional user experiences.',
        photo: {
          url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80'
        }
      },
      categories: [
        { name: 'UI/UX', slug: 'ui-ux' },
        { name: 'Design', slug: 'design' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Great UI/UX design is more than just making things look pretty. It\'s about creating intuitive, accessible, and enjoyable experiences for users.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'User-Centered Design',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The foundation of good design is understanding your users. Conduct research, create personas, and test your designs with real people to ensure you\'re solving actual problems.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Visual Hierarchy',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Guide users through your interface by establishing a clear visual hierarchy. Use size, color, and spacing to draw attention to the most important elements.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '7',
      title: 'Database Optimization Techniques for High-Performance Applications',
      excerpt: 'Discover advanced techniques to optimize database performance and improve application speed.',
      createdAt: '2023-07-22T00:00:00Z',
      slug: 'database-optimization-techniques',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80'
      },
      author: {
        name: 'James Wilson',
        bio: 'Database administrator and backend engineer with expertise in SQL and NoSQL databases.',
        photo: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Database', slug: 'database' },
        { name: 'Performance', slug: 'performance' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Database performance can make or break an application. Slow queries and inefficient database design can lead to poor user experiences and scalability issues.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Indexing Strategies',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Proper indexing is crucial for query performance. Create indexes on columns that are frequently used in WHERE clauses, JOIN conditions, and ORDER BY statements.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Query Optimization',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Analyze your queries to identify bottlenecks. Use EXPLAIN plans to understand how the database executes your queries and optimize accordingly.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '8',
      title: 'Getting Started with Docker: Containerization for Beginners',
      excerpt: 'Learn the basics of Docker and how to containerize your applications for easier deployment.',
      createdAt: '2023-08-30T00:00:00Z',
      slug: 'getting-started-with-docker',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
      },
      author: {
        name: 'Robert Taylor',
        bio: 'DevOps engineer with expertise in containerization and cloud deployment.',
        photo: {
          url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Docker', slug: 'docker' },
        { name: 'DevOps', slug: 'devops' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Docker has revolutionized how we develop, deploy, and run applications by packaging them in lightweight, portable containers.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'What is Docker?',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Docker is a platform that enables developers to automate the deployment of applications inside lightweight, portable containers. These containers include everything needed to run the application.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Dockerfile Basics',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. It\'s the blueprint for creating Docker containers.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '9',
      title: 'Building Real-Time Applications with WebSockets',
      excerpt: 'Learn how to create real-time web applications using WebSockets and Node.js.',
      createdAt: '2023-09-14T00:00:00Z',
      slug: 'building-real-time-applications-websockets',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'Jennifer Lee',
        bio: 'Full-stack developer specializing in real-time applications and event-driven architectures.',
        photo: {
          url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80'
        }
      },
      categories: [
        { name: 'WebSockets', slug: 'websockets' },
        { name: 'Node.js', slug: 'nodejs' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Real-time web applications are becoming increasingly common, from chat applications to live dashboards. WebSockets provide a full-duplex communication channel over a single TCP connection.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Understanding WebSockets',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Unlike HTTP, which is request-response based, WebSockets allow for persistent connections between client and server. This enables real-time data transfer in both directions.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Implementing with Node.js',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Node.js provides excellent support for WebSockets through libraries like Socket.IO, which handles the complexity of real-time communication and provides fallbacks for older browsers.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '10',
      title: 'The Complete Guide to Progressive Web Apps (PWAs)',
      excerpt: 'Everything you need to know about building Progressive Web Apps for better user experience.',
      createdAt: '2023-10-25T00:00:00Z',
      slug: 'complete-guide-to-pwas',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
      },
      author: {
        name: 'Thomas Anderson',
        bio: 'Frontend architect with expertise in modern web technologies and performance optimization.',
        photo: {
          url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'PWA', slug: 'pwa' },
        { name: 'Web Development', slug: 'web-development' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Progressive Web Apps (PWAs) combine the best of web and mobile applications. They\'re reliable, fast, and engaging, providing an app-like experience through the browser.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Core Components of PWAs',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'PWAs are built on three core principles: Reliable loading with service workers, Fast performance, and App-like user experience with a web app manifest.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Benefits of PWAs',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'PWAs offer numerous advantages including offline functionality, push notifications, home screen installation, and improved performance through caching strategies.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '11',
      title: 'Cybersecurity Best Practices for Developers',
      excerpt: 'Essential security practices every developer should know to protect their applications.',
      createdAt: '2023-11-08T00:00:00Z',
      slug: 'cybersecurity-best-practices',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1563014959-18ddef736641?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'Nina Roberts',
        bio: 'Security engineer with experience in application security and penetration testing.',
        photo: {
          url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'Security', slug: 'security' },
        { name: 'Best Practices', slug: 'best-practices' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Security should be a top priority for every developer. With increasing cyber threats, implementing security best practices is essential to protect user data and maintain trust.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Input Validation and Sanitization',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Always validate and sanitize user inputs to prevent injection attacks like SQL injection and cross-site scripting (XSS). Never trust user input without proper validation.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Authentication and Authorization',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Implement strong authentication mechanisms, use secure password storage with proper hashing, and enforce role-based access control to protect sensitive resources.',
                },
              ],
            },
          ],
        },
      },
    }
  },
  {
    node: {
      id: '12',
      title: 'State Management in React: Context API vs Redux',
      excerpt: 'Comparing different state management solutions in React and when to use each.',
      createdAt: '2023-12-03T00:00:00Z',
      slug: 'state-management-react-context-vs-redux',
      featuredImage: {
        url: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
      },
      author: {
        name: 'Kevin Martinez',
        bio: 'React expert with deep knowledge of state management patterns and architectures.',
        photo: {
          url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80'
        }
      },
      categories: [
        { name: 'React', slug: 'react' },
        { name: 'State Management', slug: 'state-management' }
      ],
      content: {
        raw: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  text: 'State management is a critical aspect of React applications. Choosing the right solution depends on your application\'s complexity and requirements.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'React Context API',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'The Context API is built into React and provides a way to share values between components without having to explicitly pass a prop through every level of the tree.',
                },
              ],
            },
            {
              type: 'heading-three',
              children: [
                {
                  text: 'Redux',
                },
              ],
            },
            {
              type: 'paragraph',
              children: [
                {
                  text: 'Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently and are easy to test.',
                },
              ],
            },
          ],
        },
      },
    }
  }
];

const mockCategories = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Web Development', slug: 'web-development' },
  { name: 'React', slug: 'react' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Node.js', slug: 'nodejs' },
  { name: 'API', slug: 'api' },
  { name: 'CSS', slug: 'css' },
  { name: 'Web Design', slug: 'web-design' },
  { name: 'Machine Learning', slug: 'machine-learning' },
  { name: 'Python', slug: 'python' },
  { name: 'UI/UX', slug: 'ui-ux' },
  { name: 'Design', slug: 'design' },
  { name: 'Database', slug: 'database' },
  { name: 'Performance', slug: 'performance' },
  { name: 'Docker', slug: 'docker' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'WebSockets', slug: 'websockets' },
  { name: 'PWA', slug: 'pwa' },
  { name: 'Security', slug: 'security' },
  { name: 'Best Practices', slug: 'best-practices' },
  { name: 'State Management', slug: 'state-management' }
];

// Fetch helper function
const fetchApi = async (endpoint, options = {}) => {
  if (!isRestApiConfigured()) {
    throw new Error('REST API base URL is not configured');
  }
  
  const url = `${apiBaseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    // Handle network errors specifically
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn(`Network error when fetching from ${url}:`, error.message);
      throw new Error('Network error - please check if the backend server is running');
    }
    throw error;
  }
};

//request to locate the posts 
export const getPosts = async () => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query MyQuery {
        postsConnection {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;

    try {
      const result = await request(graphqlAPI, query);
      return result.postsConnection.edges;
    } catch (error) {
      console.error('Error fetching posts from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const posts = await fetchApi('/posts');
      return posts.map(post => ({ node: post }));
    } catch (error) {
      console.error('Error fetching posts from REST API:', error.message || error);
      // If it's a network error, we should still fall back to mock data
      if (error.message && error.message.includes('Network error')) {
        console.warn('Network issue detected. Using mock data as fallback.');
      }
    }
  }
  
  console.warn('No API configured. Using mock data.');
  return mockPosts;
};

export const getRecentPosts = async () => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetPostDetails {
        posts(
          orderBy: createdAt_ASC
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    
    try {
      const result = await request(graphqlAPI, query);
      return result.posts;
    } catch (error) {
      console.error('Error fetching recent posts from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const posts = await fetchApi('/posts');
      return posts.slice(0, 3);
    } catch (error) {
      console.error('Error fetching recent posts from REST API:', error.message || error);
      // If it's a network error, we should still fall back to mock data
      if (error.message && error.message.includes('Network error')) {
        console.warn('Network issue detected. Using mock data as fallback.');
      }
    }
  }
  
  console.warn('No API configured. Using mock data.');
  return mockPosts.slice(0, 3).map(post => post.node);
};

export const getSimilarPosts = async (categories, slug) => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    
    try {
      const result = await request(graphqlAPI, query, { slug, categories });
      return result.posts;
    } catch (error) {
      console.error('Error fetching similar posts from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const posts = await fetchApi('/posts');
      const filteredPosts = posts.filter(post => 
        post.slug !== slug && 
        post.categories.some(cat => categories.includes(cat))
      );
      return filteredPosts.slice(0, 3);
    } catch (error) {
      console.error('Error fetching similar posts from REST API:', error.message || error);
      // If it's a network error, we should still fall back to mock data
      if (error.message && error.message.includes('Network error')) {
        console.warn('Network issue detected. Using mock data as fallback.');
      }
    }
  }
  
  console.warn('No API configured. Using mock data.');
  return mockPosts.slice(0, 3).map(post => post.node);
};

export const getCategories = async () => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetGategories {
          categories {
            name
            slug
          }
      }
    `;

    try {
      const result = await request(graphqlAPI, query);
      return result.categories;
    } catch (error) {
      console.error('Error fetching categories from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const categories = await fetchApi('/categories');
      return categories;
    } catch (error) {
      console.error('Error fetching categories from REST API:', error.message || error);
      // If it's a network error, we should still fall back to mock data
      if (error.message && error.message.includes('Network error')) {
        console.warn('Network issue detected. Using mock data as fallback.');
      }
    }
  }
  
  console.warn('No API configured or network error. Using mock data.');
  return mockCategories;
};

export const getPostDetails = async (slug) => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          author{
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage{
            url
          }
          categories {
            name
            slug
          }
          content{
            raw
          }
        }
      }
    `;

    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.post;
    } catch (error) {
      console.error('Error fetching post details from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const post = await fetchApi(`/posts/${slug}`);
      // Transform the response to match the expected structure
      return {
        ...post,
        content: {
          raw: {
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    text: post.content || 'Content not available'
                  }
                ]
              }
            ]
          }
        }
      };
    } catch (error) {
      console.error('Error fetching post details from REST API:', error);
    }
  }
  
  console.warn('No API configured. Using mock data.');
  // Find the post with the matching slug
  const post = mockPosts.find(p => p.node.slug === slug);
  const postData = post ? post.node : mockPosts[0]?.node || {};
  
  // Ensure the post data has all required fields
  return {
    ...postData,
    title: postData.title || 'Untitled Post',
    excerpt: postData.excerpt || 'No excerpt available',
    content: postData.content || { raw: { children: [{ type: 'paragraph', children: [{ text: 'Content not available' }] }] } },
    featuredImage: postData.featuredImage || { url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80' },
    author: postData.author || { name: 'Unknown Author', bio: '', photo: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80' } },
    categories: postData.categories || [],
    createdAt: postData.createdAt || new Date().toISOString(),
    slug: postData.slug || slug
  };
};

export const submitComment = async (obj) => {
  // For now, we'll just simulate a successful comment submission
  console.warn('Comment submission is simulated. In a real application, this would connect to a backend.');
  return { success: true };
};

export const getComments = async (slug) => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetComments($slug:String!) {
        comments(where: {post: {slug:$slug}}){
          name
          createdAt
          comment
        }
      }
    `;

    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.comments;
    } catch (error) {
      console.error('Error fetching comments from GraphQL:', error);
    }
  }
  
  // Comments are not implemented in our REST API yet
  console.warn('Comments feature not implemented in REST API. Returning empty array.');
  return [];
};

export const getFeaturedPosts = async () => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetCategoryPost {
        posts(where: {featuredPost: true}) {
          id
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;

    try {
      const result = await request(graphqlAPI, query);
      return result.posts;
    } catch (error) {
      console.error('Error fetching featured posts from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const posts = await fetchApi('/posts');
      // In a real implementation, you would have a featured flag
      // For now, we'll return the first 3 posts
      return posts.slice(0, 3);
    } catch (error) {
      console.error('Error fetching featured posts from REST API:', error);
    }
  }
  
  console.warn('No API configured. Using mock data.');
  return mockPosts.slice(0, 3).map(post => post.node);
};

export const getAdjacentPosts = async (createdAt, slug) => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
        next:posts(
          first: 1
          orderBy: createdAt_ASC
          where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
        previous:posts(
          first: 1
          orderBy: createdAt_DESC
          where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;

    try {
      const result = await request(graphqlAPI, query, { slug, createdAt });
      return { next: result.next[0], previous: result.previous[0] };
    } catch (error) {
      console.error('Error fetching adjacent posts from GraphQL:', error);
    }
  }
  
  // Adjacent posts feature not implemented in our REST API yet
  console.warn('Adjacent posts feature not implemented in REST API. Returning null values.');
  return { next: null, previous: null };
};

export const getCategoryPost = async (slug) => {
  // Check if graphqlAPI is defined
  if (isGraphQLConfigured()) {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {categories_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
            }
          }
        }
      }
    `;

    try {
      const result = await request(graphqlAPI, query, { slug });
      return result.postsConnection.edges;
    } catch (error) {
      console.error('Error fetching category posts from GraphQL:', error);
    }
  }
  
  // Fall back to REST API or mock data
  if (isRestApiConfigured()) {
    try {
      const posts = await fetchApi('/posts');
      const filteredPosts = posts.filter(post => 
        post.categories.includes(slug)
      );
      return filteredPosts.map(post => ({ node: post }));
    } catch (error) {
      console.error('Error fetching category posts from REST API:', error);
    }
  }
  
  console.warn('No API configured. Using mock data.');
  // Filter posts by category
  const filteredPosts = mockPosts.filter(post => 
    post.node.categories.some(category => category.slug === slug)
  );
  return filteredPosts;
};
