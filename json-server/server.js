/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require( 'path' );
const jsonServer = require( 'json-server' );
const login = require( './login' );
const refreshToken = require( './refreshToken' );
const logout = require( './logout' );
const forgotPassword = require( './forgot-password' );
const assignRoles = require( './assignRolesController' );
const permissions = require('./permissions');
const server = jsonServer.create();
const router = jsonServer.router( path.resolve( __dirname, 'db.json' ) );
const middlewares = jsonServer.defaults();

/* const express = require('express');
const app = express();
app.use(express.json()); */

const categories = require('./categories.json');
const products = require('./db.json');

server.use( middlewares );

const categoryRoutes = jsonServer.router(categories);
const productRoutes = jsonServer.router(products);

server.use('/categories', categoryRoutes);
server.use('/products', productRoutes);

server.use( jsonServer.rewriter( {
    '/api/*': '/$1',
    '/auth/login': '/super-admin-login',
    '/auth/refresh-token': '/refresh-token',
    '/auth/account': '/users',
    '/auth/logout': '/logout',
    '/auth/forgot-password': '/forgot-password',
    '/auth/login?provider=local': '/super-admin-login',
    '/auth/permissions': '/permissions',
} ) );

server.put( '/users/assign-role/:userId', assignRoles );

router.render = ( req, res ) =>
{
 //  if (req.originalUrl.startsWith('/categories')) {
 //   res.json(categories);
 // }  else if (req.originalUrl.startsWith('/products')) {
 //  res.json( {data: res.locals.data}  );
 //  }
    /* res.json({
      products: res.locals.data,
    }); } */
 //  else {
    res.json({
      data: res.locals.data,
    });
//}
};


/* app.get('/products', (req, res) => {
  res.json(products);
}); */

server.use( login );
server.use( refreshToken );
server.use( permissions )
server.use( logout );
server.use( forgotPassword );
server.use( router );

server.listen( 8090, () =>
{
    console.log( 'JSON Server is running on port 8090' );
} );
