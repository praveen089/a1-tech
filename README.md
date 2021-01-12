# a1-tech
Mobile API
Credit Card Processing System: a RESTful API capable of managing the credit card processing system with method get, add, charges and credit.
It is use LUNH 10 algorithm for validating card number. 
• This API should be able to: 

o Add: will create a new credit card for a given name, card number, and limit
	Method: Post 
	URL: http://localhost:3006/api/v1/card/add
	Data: 
	{
    		"name": "PK",
    		"card_no": "79927398713",
    		"card_limit": "70"
	}
o Get all: returns all cards in the system
	Method: Get 
	URL: http: http://localhost:3006/api/v1/card

o List data with id
	Method: Get 
	URL: http:http://localhost:3006/api/v1/card/:id 

o Charge: will increase the balance of the card associated with the provided name by the amount specified
	Method: Post 
	URL: http://localhost:3006/api/v1/card/charge/:name (eg: name= Praveen) 
	Data: {  "card_limit": "10" }

o Credit: will decrease the balance of the card associated with the provided name by the amount specified
	Method: Post 
	URL: http://localhost:3006/api/v1/card/credit/:name (eg: name= Praveen) 
	Data: {  "card_limit": "10" }
