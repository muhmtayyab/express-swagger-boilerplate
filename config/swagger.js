import swaggerJSDoc from 'swagger-jsdoc';

import { SWAGGER_SERVERS } from '../constants';

const useSwaggerUIAuthStoragePlugin = () => {
  const afterLoad = (ui) => {
    const AUTH_SCHEME = 'bearerAuth';

    setTimeout(() => {
      const token = localStorage.getItem(AUTH_SCHEME);
      if (token) {
        setAuthToken(token);
      }
    }, 1500);


    const setAuthToken = (token) => {
      const authorization = {
        bearerAuth: {
          name: 'bearerAuth',
          schema: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: ''
          },
          value: token
        }
      };
      ui.authActions.authorize(authorization);
    };
  };

  return {
    afterLoad
  };
};

const responseInterceptor = (req) => {
  const { status, url, body } = req;
  const splittedUrl = url.split('/');
  const route = splittedUrl[splittedUrl.length - 1];
  if (status === 200 && route === 'sign-in') {
    const { token } = body;
    localStorage.setItem('bearerAuth', token);
    const authorization = {
      bearerAuth: {
        name: 'bearerAuth',
        schema: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: ''
        },
        value: token
      }
    };
    ui.authActions.authorize(authorization);
  }
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Documentation',
      version: '1.0.0',
      description: 'Swagger'
    },
    servers: SWAGGER_SERVERS,
    externalDocs: {
      description: 'Download Postman Collection',
      url: '/api/v1/swagger/docs.json'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./controllers/auth/*.js']
};

const options = {
  swaggerOptions: {
    docExpansion: 'none',
    plugins: [useSwaggerUIAuthStoragePlugin()],
    responseInterceptor
  }
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export {
  swaggerDocs,
  options
};
