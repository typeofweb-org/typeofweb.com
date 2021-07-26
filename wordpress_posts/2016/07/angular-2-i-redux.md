---
id: 21
index: 10
title: Angular 2 i Redux
date: 2016-07-04T06:35:51.000Z
status: publish
permalink: angular-2-i-redux
authors:
  - michal-miszczyszyn
guid: https://typeofweb.com/index.php/2016/07/04/angular-2-i-redux/
type: post
categories:
  - slug: javascript
    name: JavaScript
  - slug: dobry-kod
    name: Dobry Kod
  - slug: front-end
    name: Front-end
series:
  slug: angular-2
  name: Angular 2
seo: {}

---
<p>Otóż okazuje się, że Redux świetnie współgra z aplikacjami w Angular 2 i biblioteka ta jest bardzo często wykorzystywana razem z tym frameworkiem. Poprzednio opisywałem sposoby na komunikację pomiędzy komponentami sugerowane przez twórców Angulara, wszystkie miały jednak pewną wadę: <strong>Dobrze działały tylko w przypadku prostych scenariuszy</strong>. Użycie Reduksa znacznie upraszcza zarządzanie stanem <strong>nawet najbardziej złożonych aplikacji</strong> oraz umożliwia łatwą komunikację pomiędzy komponentami. Na czym dokładnie polega filozofia Reduksa opisywałem we wpisie <a href="https://typeofweb.com/2016/06/10/flux-i-redux/">Flux i Redux</a>, więc osoby nieznające tego konceptu zapraszam do tamtego wpisu. W tym artykule chciałbym skupić się na bardzo konkretnym przykładzie użycia biblioteki Redux razem z Angular 2.</p>

<p class=important>Sposobów połączenia Reduksa z Angularem 2 jest wiele, między innymi biblioteka <code>ng2-redux</code>, czy bardziej skomplikowany koncept łączący FRP i Reduksa: <code>ngrx/store</code>. Tutaj prezentuję najprostszą metodę, dzięki czemu wiedza ta jest najbardziej uniwersalna.</p>

<h1 id="koncepcja">Koncepcja</h1>

<p>Napiszmy teraz znowu listę zadań w Angular 2, tym razem wykorzystując Reduksa do zarządzania stanem aplikacji. Zacznijmy od zaprojektowania kodu i podziału na komponenty. Potrzebujemy komponent do dodawania zadań, komponent reprezentujący ich listę oraz komponent będący pojedynczym zadaniem na liście. Koncepcyjnie HTML będzie wyglądać tak:</p>

<pre><code class="language-html">&lt;my-app&gt;  
    &lt;my-add-todo&gt;&lt;/my-add-todo&gt;
    &lt;my-todo-list&gt;
        &lt;my-todo-list-item&gt;&lt;/my-todo-list-item&gt;
        &lt;my-todo-list-item&gt;&lt;/my-todo-list-item&gt;
        …
    &lt;/my-todo-list&gt;
&lt;/my-app&gt;  
</code></pre>

<h1 id="redux">Redux</h1>

<h2 id="akcje">Akcje</h2>

<p>Rozpoczynamy od stworzenia projektu oraz definiujemy akcje Reduksa w pliku <code>todoActions.ts</code>. W tej prostej appce potrzebujemy tylko dwóch akcji:</p>

<ul>
<li>utworzenie zadania</li>
<li>oznaczenie zadania jako ukończone/nieukończone</li>
</ul>

<p>Oprócz tego, w tym samym pliku umieszczamy też klasę z metodami ułatwiającymi tworzenie akcji (tzw. <em>action creators</em>):</p>

<pre><code class="language-typescript">export const ADD_TODO = 'ADD_TODO';  
export const TOGGLE_TODO = 'TOGGLE_TODO';

@Injectable()
export class TodoActions {  
  private nextTodoID = 0;

  addTodo(title:string) {
    return {
      id: this.getNextID(),
      type: ADD_TODO,
      title,
      complete: false
    };
  }

  toggleTodo(id:number) {
    return {
      id,
      type: TOGGLE_TODO
    };
  }

  private getNextID() {
    return ++this.nextTodoID;
  }
}
</code></pre>

<p>Klasa oznaczona jest dekoratorem <code>@Injectable</code>, aby było możliwe jej wstrzyknięcie do klas komponentów poprzez <em>Dependency Injection</em>. Implementacja <code>getNextID</code> może być dowolna, tutaj dla prostoty <code>id</code> zadań to kolejne liczby naturalne. Jednocześnie w pliku <code>todo.ts</code> definiujemy sobie pomocniczą klasę oznaczającą nowe zadanie na liście:</p>

<pre><code class="language-typescript">export class Todo {  
  id:number;
  title:string;
  complete:boolean;
}
</code></pre>

<h2 id="reducer">Reducer</h2>

<p>Następnym krokiem pracy z reduksem jest stworzenie tzw. <em>reducera</em>. W tym przypadku reducer jest tylko jeden, bo aplikacja jest niezwykle prosta. Zaczynamy do zadeklarowania interfejsu dla stanu naszej aplikacji oraz zdefinowania stanu początkowego:</p>

<pre><code class="language-typescript">interface AppState {  
  todos: Array&lt;Todo&gt;;
}

const initialState:AppState = {  
  todos: []
};
</code></pre>

<p>Nasz <em>reducer</em> działa w ten sposób, że sprawdza którą z akcji ma obsłużyć i wywołuje odpowiednią funkcję:</p>

<pre><code class="language-typescript">export function rootReducer(state:AppState = initialState, action):AppState {  
  switch (action.type) {
    case ADD_TODO:
      return addTodo(state, action);
      break;
    case TOGGLE_TODO:
      return toggleTodo(state, action);
      break;
    default:
      return state;
  }
}

function addTodo(state:AppState, action):AppState {  
  return {
    todos: [
    ...state.todos,
    {id: action.id, title: action.title, complete: action.complete}
    ]
  };
}

function toggleTodo(state:AppState, action):AppState {  
  return {
    todos: state.todos.map(todo =&gt; {
      if (todo.id === action.id) {
        return {
          id: todo.id,
          complete: !todo.complete,
          title: todo.title
        };
      }
      return todo;
    })
  };
}
</code></pre>

<p class=important>Reducer nie mutuje <code>todos</code>, zawsze zwraca nową tablicę.</p>

<h2 id="store">Store</h2>

<p>Na podstawie tak napisanego <em>reducera</em> tworzymy <em>store</em>, a następnie informujemy Angulara, że ten <em>store</em> jest dostępny jako zależność do wstrzyknięcia. Dodatkowo wywołujemy tutaj funkcję <code>window.devToolsExtension()</code> – jest to funkcja udostępniania przez <a href="https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en">wtyczkę Redux DevTools</a> do przeglądarki Google Chrome. Wtyczka ta znacznie ułatwia pracę z Reduksem, pozwala na przykład przejrzeć wszystkie zdarzenia, które miały miejsce w aplikacji, a także dowolnie je cofać i powtarzać. Mała próbka możliwości:</p>

<iframe width=560 height=231 src="https://www.youtube.com/embed/d8-mposzd5E?rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

<p>Cały kod umieszczamy w pliku <code>main.ts</code>, w którym zwyczajowo znajduje się wywołanie funkcji <code>bootstrap</code>. Drugim, do tej pory pomijanym argumentem funkcji <code>bootstrap</code> jest tablica <code>providers</code>. Jej działanie jest analogiczne do własności o tej samej nazwie w komponentach.</p>

<pre><code class="language-typescript">const appStoreFactory = () =&gt; {  
  const appStore = createStore(rootReducer, undefined, window.devToolsExtension &amp;&amp; window.devToolsExtension());
  return appStore;
};

bootstrap(AppComponent, [  
  provide('AppStore', { useFactory: appStoreFactory }),
  TodoActions 
]);
</code></pre>

<p>Warto zwrócić uwagę na nietypowy sposób w jaki użyty jest tutaj <code>appStore</code> – na potrzeby tego wpisu nie będę się zagłębiał w ten temat (ale <strong>na pewno samemu Dependency Injection w Angular 2 poświęce cały osobny artykuł!</strong>). Należy jedynie pamiętać, że w Angularze wstrzykiwać możemy albo klasy, albo dowolne wartości identyfikowane po nazwie. Tutaj <code>appStore</code> nie jest klasą, więc będzie identyfikowany pod nazwą <code>AppStore</code>.</p>

<h1 id="komponenty">Komponenty</h1>

<p>Kolejnym krokiem jest stworzenie komponentów <code>AddTodoComponent</code>, <code>TodoListComponent</code> i <code>TodoListItemComponent</code>. Możemy do tego wykorzystać Angular CLI, jak już to omawiałem w jednym z poprzednich wpisów. Modyfikujemy <code>AppComponent</code> dodając do niego tablicę <code>providers</code> z wymienionymi komponentami oraz używamy ich w szablonie:</p>

<pre><code class="language-typescript">@Component({
  selector: 'my-app',
  directives: [AddTodoComponent, TodoListComponent],
  template: `
  &lt;h1&gt;To do list with Redux&lt;/h1&gt;
  &lt;my-add-todo&gt;&lt;/my-add-todo&gt;
  &lt;my-todo-list&gt;&lt;/my-todo-list&gt;
  `
})
export class AppComponent {  
}
</code></pre>

<h2 id="addtodocomponent"><code>AddTodoComponent</code></h2>

<p>Pierwszy z komponentów jest odpowiedzialny za dodawanie elementów do listy. Nic prostszego, zwykły input, <code>ngModel</code> oraz metoda, która tworzy akcję <code>ADD_TODO</code>:</p>

<pre><code class="language-typescript">@Component({
    selector: 'my-add-todo',
    template: `
    &lt;form&gt;
      &lt;label&gt;
        Nowe zadanie:
        &lt;input type="text" [(ngModel)]="newTodoTitle" (keyup.enter)="addTodo()"&gt;
      &lt;/label&gt;
    &lt;/form&gt;
    `
})
export class AddTodoComponent {  
    newTodoTitle:string;

    addTodo() {
      if (!this.newTodoTitle) {
          return;
      }
      const action = this.todoActions.addTodo(this.newTodoTitle);
      this.appStore.dispatch(action);
      this.newTodoTitle = '';
    }

    constructor(@Inject('AppStore') private appStore:Store,
                private todoActions:TodoActions) {
    }
}
</code></pre>

<p>Zwróćmy uwagę w jaki sposób wstrzykiwany jest <code>appStore</code> – identyfikowany jest po nazwie i używamy do tego dekoratora <code>@Inject('AppStore')</code>.</p>

<h2 id="todolistcomponent"><code>TodoListComponent</code></h2>

<p>Drugi komponent naszej aplikacji to lista. Jej zadaniem będzie pobranie tablicy zadań oraz reagowanie na zmiany. Obie te rzeczy realizujemy poprzez wywołanie funkcji <code>appStore.subscribe()</code> w momencie inicjalizacji komponentu. <strong>Ważne jest jednak, aby tę subskrypcję usunąć gdy komponent jest niszczony</strong>. Posłużą do tego zdarzenia cyklu życia. Gdy już mamy tablicę zadań, wyświetlimy je w szablonie przy pomocy <code>*ngFor</code> i komponentu <code>TodoListItemComponent</code>, do którego przekażemy obiekty z zadaniami:</p>

<pre><code class="language-typescript">@Component({
  selector: 'my-todo-list',
  directives: [TodoListItemComponent],
  template: `
  &lt;my-todo-list-item *ngFor="let todo of todos" [todo]="todo"&gt;&lt;/my-todo-list-item&gt;
  `
})
export class TodoListComponent implements OnInit, OnDestroy {  
  todos:Array&lt;Todo&gt;;

  private unsubscribe:Function;

  ngOnInit() {
    this.unsubscribe = this.appStore.subscribe(() =&gt; {
      const state = this.appStore.getState();
      this.todos = state.todos;
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  constructor(@Inject('AppStore') private appStore:Store) {
  }
}
</code></pre>

<h2 id="todolistitemcomponent"><code>TodoListItemComponent</code></h2>

<p>To już chyba tylko formalność. Ten komponent reprezentuje element na liście zadań i ma jeden atrybut wejściowy <code>@Input() todo</code>, a po kliknięciu na checkbox wysyłana jest odpowiednia akcja:</p>

<pre><code class="language-typescript">@Component({
  selector: 'my-todo-list-item',
  template: `
  &lt;label&gt;
    &lt;input type="checkbox" (change)="onTodoClick()" [checked]="todo.complete"&gt;
    {{ todo.title }}
  &lt;/label&gt;
  `
})
export class TodoListItemComponent {  
  @Input() todo:Todo;

  onTodoClick() {
    const action = this.todoActions.toggleTodo(this.todo.id);
    this.appStore.dispatch(action);
  }

  constructor(@Inject('AppStore') private appStore:Store,
              private todoActions:TodoActions) {
  }
}
</code></pre>

<h1 id="demo">Demo</h1>

<p>Aplikacja jest gotowa. Zaimplementowaliśmy bardzo prostą listę zadań z użyciem frameworka Angular 2 oraz biblioteki Redux. Efekt jest widoczny poniżej. Tak prosty przykład być może nie oddaje jeszcze pełni zalet wynikających z wykorzystania Reduksa, jednak <strong>gdy aplikacja będzie rosła na pewno docenimy możliwości, które daje Redux</strong> oraz łatwość z jaką możemy rozwijać nasze komponenty bez konieczności czynienia drastycznych zmian w innych częściach aplikacji. Zachęcam do komentowania :)</p>

<iframe class=large style="height: 350px" src="//embed.plnkr.co/xKylVcq7wCoEsM2xxDiM/" frameborder="0" allowfullscren="allowfullscren"></iframe>
