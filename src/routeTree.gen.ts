/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as ForDentistsRouteImport } from './routes/for-dentists'
import { Route as TelegramRouteImport } from './routes/for-dentists.telegram'
import { Route as AdminRouteImport } from './routes/admin'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const ForDentistsRoute=ForDentistsRouteImport.update({id:'/for-dentists',path:'/for-dentists',getParentRoute:()=>rootRouteImport} as any)
const TelegramRoute=TelegramRouteImport.update({id:'/for-dentists/telegram',path:'/for-dentists/telegram',getParentRoute:()=>rootRouteImport} as any)
const AdminRoute=AdminRouteImport.update({id:'/admin',path:'/admin',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath {'/':typeof IndexRoute;'/for-dentists':typeof ForDentistsRoute;'/for-dentists/telegram':typeof TelegramRoute;'/admin':typeof AdminRoute}
export interface FileRoutesByTo extends FileRoutesByFullPath {}
export interface FileRoutesById {__root__:typeof rootRouteImport;'/':typeof IndexRoute;'/for-dentists':typeof ForDentistsRoute;'/for-dentists/telegram':typeof TelegramRoute;'/admin':typeof AdminRoute}
export interface FileRouteTypes {fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:keyof FileRoutesByFullPath;fileRoutesByTo:FileRoutesByTo;to:keyof FileRoutesByTo;id:keyof FileRoutesById;fileRoutesById:FileRoutesById}
export interface RootRouteChildren {IndexRoute:typeof IndexRoute;ForDentistsRoute:typeof ForDentistsRoute;TelegramRoute:typeof TelegramRoute;AdminRoute:typeof AdminRoute}
declare module '@tanstack/react-router' {interface FileRoutesByPath {'/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};'/for-dentists':{id:'/for-dentists';path:'/for-dentists';fullPath:'/for-dentists';preLoaderRoute:typeof ForDentistsRouteImport;parentRoute:typeof rootRouteImport};'/for-dentists/telegram':{id:'/for-dentists/telegram';path:'/for-dentists/telegram';fullPath:'/for-dentists/telegram';preLoaderRoute:typeof TelegramRouteImport;parentRoute:typeof rootRouteImport};'/admin':{id:'/admin';path:'/admin';fullPath:'/admin';preLoaderRoute:typeof AdminRouteImport;parentRoute:typeof rootRouteImport}}}
const rootRouteChildren:RootRouteChildren={IndexRoute,ForDentistsRoute,TelegramRoute,AdminRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
import type {getRouter} from './router.tsx'
import type {startInstance} from './start.ts'
declare module '@tanstack/react-start' {interface Register {ssr:true;router:Awaited<ReturnType<typeof getRouter>>;config:Awaited<ReturnType<typeof startInstance.getOptions>>}}
