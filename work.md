**react-router-dom нужен для перемещения между страницами приложения без перезагрузки страницы**

**_то есть для создания SPA_**

    Установка react-router-dom
    Создание Navbar
    Switch и его особенности
    Route
    Параметры и свойства у Route
    Опциональные параметры
    Query параметры
    Переадресация (редирект)
    History. Программная навигация
    Хуки react-router-dom
    Вложеные пути
    Рефакторинг

> npx create-react-app react-router

> установка библиотеки  
> `npm i react-router-dom`

> autoimport - расширение vscode для автоматического импорта и изменения путей для модулей

## подключение роутинга

# `ReactDOM.render( <React.StrictMode> <BrowserRouter> <App /> </BrowserRouter> </React.StrictMode>, document.getElementById('root'), )`

? что есть путь : '/', '/posts', или / из posts ???

и почему вылетает ошибка при записи в App

<div>
      <Navbar />
      <h1>App</h1>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/login' component={Login} />
      <Route path='/posts' component={Posts} />
      <Route path='/' component={Home} />
    </div>

! необходимо упорядочивать маршруты от конкретных к более общим

## исправление перезагрузки страницы

> Link

`import { Link } from 'react-router-dom'`

**заменяем ссылку <a></a> на <Link> </Link>**
`<li><a href="/">Home</a></li>`
`<li><Link to="/">Home</Link></li>`
**в этом случае перезагрузки страницы не происходит и просто меняется отображаемое содержимое**

> Компонент _Link_ является _оберткой которая добавляет дополнительный обработчик событий к тегу <a>_

> Компонент router является оберткой для отображаемых элементов

и он добавляет дополнительные свойства для элемента

- History (отвечает за то что происходит с нашей страницей: переходы вперед назад, на новую страницу, перенаправление пользователя)
- location - жанные которыепередает нам приложение, и указвыет по какому пути мы находимся в данный момент
- match : совпадения - параметр `isExact:true` т.е. совпадение,  
  если мы это делаем через атрибут `component={Posts}`

## передача параметров на страницу

передаче параметров (Dashboard) в компонент как переменную без дополнительных параметров:
`<Route path="/dashboard" component={Dashboard} />`

чтобы можно передавать параметы надо воспользоваться другим атрибутом: `render` в которую передаем стрелочную функцию
`<Route path="/dashboard" render={() => <h1>Dashboard</h1>} />`

предача параметров:
<Route path="/dashboard" render={() => <Dashboard isAdmin={false} />} />
но в этом случае пропадают history, location, match

`<Route path="/dashboard" render={(props) => <Dashboard isAdmin={false} {...props} />} />`
в этом случае мы на входе стрел.функции получаем параметры `props` и потом через спрэд оператор передаем их в dashboard
или можно передавать дополнительные условия отображения
`<Route path="/dashboard" render={(props) => { return false && <Dashboard isAdmin={false} {...props} />`

## параметры путей

находятся в свойствах const match которые можно вытащить через match.params.

> postId = match.params.postId

## Опциональные параметры

изменить отображение posts и postsList
и объежинить их
`path="/posts/:postId?"`

<Route
path="/posts"
render={(props) => <Post posts={posts} {...props} />}
/>
<Route
path="/posts"
render={(props) => <PostsList posts={posts} {...props} />}
/>

<Route
path="/posts/:postId?/:display?"
render={(props) => <Posts {...props} />}
/>

`path="/posts/:postId?/:display?"` - display - это второй опциональный параметр

доступ к нему через `const display = match.params.display`

## Query параметры

это параметры которые в строке запроса стоят после вопроситльного знака

`?sortBy=newest&count=1` и эта строка запроса будет видется в
RouterProvider > location > search

чтобы распарсить строку поиска нужен пакет query-string и для преобразования их в адресные объекты

> npm i query-string

и так как параметр search находится в location - то надо деструктуризировать в Posts еще и location
отображение `const search = query.parse(location.search)`

## пагинация

через query параметры
устанавливаем lodash
строка запроса: `http://localhost:3000/posts?count=1`

`const cropPosts = search.count ? _(posts).slice(0).take(search.count).value() : posts`
где `search.count=1`

таким образом в бэкэнд можно передать в бэкенд запрашиваемое количество элементов чего-либо, на фронтэнде так можно передать имя пользователя на другую страницу

## редирект

когда идет запрос на несуществующую странцицу по маршрутизатор долже перевести на страницу 404
через `Redirect`

случай1: когда перенаправление на страницу 404
в App^
`<Route path="/404" component={NotFound} />`
`<Redirect to="/404" />`
создать компонетнт со страницей 404

случай2:
когда надо делать перенаправление со старых страниц на новые
была страница /admin и ее надо закинуть на /dashboard
`<Redirect from="/admin" to="/dashboard" />`

## History

в свойствах history есть методы push и replace

> push перенаправляет пользователя на другую страницу без ее перезагрузки

> replace заменяет перенаправленную страницу и обратного переключения не будет
> т.е. в объекте history не добавляется __новое событие__ а заменяется текущая страница

### логика перехода на страницу каждого поста

реализация через Link - каждый пост будет ссылка
в PostList добавим Link и задаем ему роут куда нужно перекинуть
`const PostsList = ({ posts }) => { return ( <> { posts.map((post) => ( <Link key={ post.id } to={`posts/\${post.id}`}> <h3 >{ post.label }</h3> </Link>)) } </>) }`
в свойстве to формируем адресную строку для поста с номером id

### реализация возврата пользователя на страницу всех постов

на станице постов создадим кнопку которая будет перенаправлять на страницу всех постов
кнопка Сохранить
событие onClick
метод обработки handleSave()
нужен для него history
забираем из родительского posts объект history

и в функции делаем push на страницу постов '/posts'
`const handleSave = () => { history.push('/posts') }`
и мы можем переходить и через кнопку на посты и через стрелку обратно

если вместо push сделать replace то стрелка назад не будет работать. возврата внутрь поста на редактирование не будет
`const handleSave = () => { history.replace('/posts') }`

## git

…or create a new repository on the command line
echo "# react-route" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ine-nk/react-route.git
git push -u origin main

…or push an existing repository from the command line
git remote add origin https://github.com/ine-nk/react-route.git
git branch -M main
git push -u origin main


**
echo "# route-my" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ine-nk/route-my.git
git push -u origin main
**

## Хуки react-router-dom

вместо передачи объектов **history**, **match**, **location** из родительских компонентов можно воспользоваться програмными хуками

> _для этого мы вызваем в дочернем объекте хук и получаем доступ к этому объекту_

`import { useHistory } from 'react-router-dom'` (для прогаммной навигации) и нуже для того чтобы мы могли переадресовывать пользователя на нужные страницы

useHistory : содержит в себе все history для данного компонента
`const history = useHistory()`
и используем эту константу как объект history

**таким же методом можно и заменить {match}**
`import { useParams } from 'react-router-dom'`
`const params = useParams()`
и далее деструктуризируя `params`
`const { postId } = params`
используем все те же как и с **match** методы

если надо получить **query** _параметры_ то надо использовать
`useLocation()`

## Вложенные маршруты (Nested routes)

когда есть много подпутей из родительского то можно перенести эти пути внутрь родительского

`<Route path="/dashboard/stats" component={Stats} />`
`<Route path="/dashboard" component={Dashboard} />`

в `dashboard`

<Route path="/dashboard/" component={Stats} /> - статистика откроется по умолчанию
