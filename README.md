## Финальная задача [RS School](https://rs.school/) React 2020 Q3
[Техническое задание X-Check](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/xcheck/xcheck.md)

## Deploy
[https://app-x-check.web.app](https://app-x-check.web.app)

## Запуск проекта

|                                                 |
|:-----------------------------------------------:|
|Установка node modules                           |
|`npm install`                                    |
|Запуск проекта в development mode                |
|`npm start`                                    |
|Запуск проекта в  production mode                |
|`npm run build`                                   |

## Технологии которые мы исользовали:

* [Create react app](https://github.com/facebook/create-react-app)
* [React](https://reactjs.org/)
* [Redux](https://redux-toolkit.js.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [NPM](https://www.npmjs.com/)
* [Eslint](https://eslint.org/)  [config google](https://github.com/google/eslint-config-google)
* [SASS](https://sass-scss.ru/)
* [Ant Design](https://ant.design/)
* [Firebase](https://firebase.google.com/)

## Наша комманда
* [Dmytro Chekhuta](https://github.com/SkyWalker1996x)
* [Yaroslav Mos](https://github.com/YaroslavBIG)
* [Darya Misyukevich](https://github.com/missdasha)
* [Pavel Sobchenko](https://github.com/pavel-sobchenko)
* [Maksim Nemtsev](https://github.com/maksim-nemtsev)
* ~~Tatsiana Masiukevich~~


## Отзывы Проверяющих (Cross-Check)

### student 1:
<details>
<summary>Ваша оценка - 360 баллов  + 20 за дизайн</summary>

Отзыв по пунктам ТЗ: 

Не выполненные/не засчитанные пункты: 

1) Список оценок можно фильтровать по заданию, выполнившему студенту и проверяющему  

2) Импорт пунктов и категорий в формате RSS Checklis  

3) Импорт пунктов и категорий в markdown формате, в котором описано большинство задач RSS  

4) Дать возможность проверяющему добавить ещё один пункт со штрафными или поощрительными баллами. Способы реализации могут быть различными, например можно просто дать возможность указывать не только максимальный балл за требование, но и минимальный меньше ноля  

Отзыв: так и не смог открыть страницу check. Возможно это связано с открытием для проверки одного и того же запроса, не зависимо от выбора. 

5) Сделать поле комментария обязательным, если оценка не совпадает с самопроверкой  

Отзыв: так и не смог открыть страницу check. 

6) Возможность оставить обратную связь проверяющему - поблагодарить или пожаловаться

7) Возможность оспорить оценку по каждому пункту  

Отзыв: в reviews/edit видел поле "Dispute grade", но его заполнение ничего не изменило: в разделе Debates ничего не появилось, после повторного открытия ревью поле осталось пустым. 

8) Принять решение по оспариваемому пункту может не только проверяющий, но и пользователь со специальной ролью  

9) Написаны юнит-тесты, code coverage > 50%. Способ получения coverage report описан в README.  

10) По названиям юнит тестов понятно, что они тестируют. Тесты не просто вызывают код, но и делают осмысленные ассерты. до +30, если code coverage меньше 50%, максимальная оценка снижается пропорционально (при 25% максимум +15 баллов)  

Частично выполненные пункты: 

1) Список запросов на проверку можно сортировать и фильтровать по заданию и выполнившему студенту.  

Отзыв: нет сортировки, только фильтрация 

2) Форма проверки и самопроверки задания  

Отзыв: selfCheck: при попытке выставить оценку выбранный пункт дублируется снизу. Данное событие происходит как при выборе radio-button так и на каждый ввод с клавиатуры. Не открывается страница Check - вылетает ошибка "Cannot read property 'maxScore' of undefined" 

3) Автор задания может остановить сбор запросов на проверку в рамках кросс-чек сессии и случайным образом распределить проверяющих  

Отзыв: в разделе Sessions/Task при выборе статуса Completed, ничего не изменилось. Возможность выбирать данную сессию при создании запроса осталась и сохраняется. 

4) Автор задания может завершить кросс-чек сессию, после чего студент может посмотреть свою итоговую оценку  

Отзыв: в разделе Sessions/Task при выборе статуса Completed, ничего не изменилось. Возможность выбирать данную сессию при создании запроса осталась и сохраняется. 

5) Каждое действие, меняющее данные, доступно только при наличии у пользователя соответствующей роли. Набор ролей можно взять из примера или придумать свои. Ограничения должны быть описаны в README. Если выбор роли недоступен при логине или регистрации, тогда в исходной базе (db.json) должны быть тестовые пользователи с каждой из ролей, а их логины и пароли должны быть в README.  

Отзыв: выбор роли частично проработан 

Выполненные пункты: 

1) Упрощённая страница/окно авторизации  

2) Страница со списком задач (tasks)  

3) Форма (на отдельной странице или в окне) создания и редактирования задачи  

4) Страница со списком запросов на проверку (review requests)  

5) Форма создания запроса на проверку  

6) Страница со списком оценок работ (reviews)  

Отзыв: после авторизации открывается пустая страница. Открылась только после "прощелкивания" по другим пунктам меню. Бал не снижал.  

7) Список оценок можно сортировать по всем полям/колонкам, где сортировка применима  

8) Страница или окно с деталями оценки одного проверяющего  

9) Главная страница со ссылками на остальные доступные страницы ИЛИ всегда видимое меню для навигации  

10) Пометить пункт как штраф ИЛИ возможность указать минимальный балл меньше 0
</details>

### slatyankov
<details>
<summary> Score: 440 </summary>
С результатами самооценки согласен
</details>

### Student 3
<details>
<summary> Score: 440 </summary>

Выполненные пункты:

Упрощённая страница/окно авторизации

Страница со списком задач (tasks)

Форма (на отдельной странице или в окне) создания и редактирования задачи

Страница со списком запросов на проверку (review requests)

Список запросов на проверку можно сортировать и фильтровать по заданию и выполнившему студенту.

Форма создания запроса на проверку

Форма проверки и самопроверки задания

Страница со списком оценок работ (reviews)

Список оценок можно сортировать по всем полям/колонкам, где сортировка применима

Список оценок можно фильтровать по заданию, выполнившему студенту и проверяющему

Страница или окно с деталями оценки одного проверяющего

Главная страница со ссылками на остальные доступные страницы ИЛИ всегда видимое меню для навигации

Пометить пункт как штраф ИЛИ возможность указать минимальный балл меньше 0

Пометить пункт как проверяемый только ментором (скрывать при кросс-чеке), или более сложная система ролей при проверке

Объединение требований в категории (basic scope, advanced, etc)

Импорт пунктов и категорий в формате RSS Checklis

Экспорт и импорт задания в собственном JSON формате. Побочный эффект - задание легко скопировать, оставив оригинальное без изменений

Кнопки для быстрой оценки (не выполнено - 0 баллов, выполнено частично - 50%, выполнено полностью - 100%), но остаётся возможность указать любое промежуточное значение

Сделать поле комментария обязательным, если оценка не совпадает с самопроверкой

Промежуточное состояние проверки (и самопроверки тоже) можно сохранить, не публикуя её

Возможность оставить обратную связь проверяющему - поблагодарить или пожаловаться

Возможность оспорить оценку по каждому пункту

Страница со списком кросс-чек сессий. Автор заданий (или другая роль на ваше усмотрение) может создавать и редактировать сессии

Студенты могут создавать запросы на проверку в рамках конкретной кросс-чек сессии

Автор задания может завершить кросс-чек сессию, после чего студент может посмотреть свою итоговую оценку

Полноценная авторизация через GitHub OAuth. Для удобства проверки выбор ролей лучше оставить при логине

В исходной базе (db.json) воспроизведено задание xcheck и создан запрос на его оценку

Дополнительные полезные возможности, не описанные в требованиях к заданию. Для оценки должны обязательно быть описаны в README

Отзыв: в процессе проверки и самопроверки отображается кол-во проверенных пунктов и сумма баллов.

README файл в репозитории с описанием используемых технологий, инструкцией для начала разработки и для деплоя продакшн версии.

Использован eslint preset (не обязательно airbnb) и нет предупреждений и ошибок

В репозитории есть "следы" активной командной работы - комментарии в пулл реквестах

Частично выполненные пункты:

Каждое действие, меняющее данные, доступно только при наличии у пользователя соответствующей роли. Набор ролей можно взять из примера или придумать свои. Ограничения должны быть описаны в README. Если выбор роли недоступен при логине или регистрации, тогда в исходной базе (db.json) должны быть тестовые пользователи с каждой из ролей, а их логины и пароли должны быть в README.

Отзыв: Роли доступны для раздела Tasks,

Student - только просмотр таблицы;

Mentor - добавление и редактирование тасков;

Administrtor - добавление и редактирование и удаление тасков;

В исходной базе (db.json) есть примеры сущностей каждого типа

Отзыв: Исходная база - firebase

</details>

### Student 4
<details>
<summary> Score: 250 </summary>

Где ссылка на pull request? не понятно как создать запрос на проверку
 
