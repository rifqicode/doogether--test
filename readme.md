-- REST API AUTH --


Docs :

Berikut List API yang harus bibuat:
<p> 1. Register </p>
<p> <b> URL : localhost:3000/auth/register ( POST ) </b> </p>
<p> Body ( JSON ) : </p>

```json
{
	"name" : "",
	"email": "",
	"password": "",
	"password_confirmation" : ""
}
```

<p> 2. Login </p>
<p> <b> URL : localhost:3000/auth/login ( POST ) </b> </p>
<p> Body ( JSON ) : </p>

```json
{
	"email" : "",
	"password": ""
}
```

<p> 3. List Session </p>
<p> <b> URL : localhost:3000/session/list?user=&keyword=&durasi=&order= ( GET ) </b> </p>

<p> 4. Detail Session </p>
<p> <b> URL : localhost:3000/session/detail/:id ( GET ) </b> </p>

<p> 5. Create Session </p>
<p> <b> URL : localhost:3000/session/create ( POST ) </b> </p>
<p> Body ( JSON ) : </p>

```json
{
	"name": "test",
	"description": "test",
	"start": "2021-12-01",
	"duration": 60
}
```

<p> 6. Update Session </p>
<p> <b> URL : localhost:3000/session/update/:id ( POST ) </b> </p>
<p> Body ( JSON ) : </p>

```json
{
	"name": "test",
	"description": "test",
	"start": "2021-12-01",
	"duration": 60
}
```

<p> 7. Delete Session </p>
<p> <b> URL : localhost:3000/session/delete/:id ( POST ) </b> </p>