#print("verifier ========", verifier)
    request.session['request_token'] = auth.request_token['oauth_token']
    

    token = request.session.get('request_token')
    print("--- token ========", token)

    for key, value in request.GET.items():
        print("%s %s", (key, value))
    

    verifier = request.GET.get('oauth_verifier')

    #session.delete('request_token')
    auth.request_token = { 'oauth_token' : token,
                    'oauth_token_secret' : verifier }
    print("verifier ========", verifier)
    try:
        auth.get_access_token(verifier)
    except tweepy.TweepError:
        print('Error! Failed to get access token.')

    auth_token = auth.access_token
    #print(auth_token)
    auth_token_secret = auth.access_token_secret
    #print(auth_token_secret)

    #show worst tweet
    #show best tweet

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    #print("step 1", auth)
    auth.set_access_token(auth_token, auth_token_secret)
    #print("step 2", auth)

    api = tweepy.API(auth, wait_on_rate_limit = True)
    #print("step 3", api)

    user_info_dict = api.me()
    #print(type(user_info_dict))
    #print("step 4", user_info_dict)
    user_id = user_info_dict.id
    #print("step 5", user_id)
    name = user_info_dict.name
    #print("step 6", name)
    screen_name = user_info_dict.screen_name
    #print("step 7", screen_name)
    followers_count = user_info_dict.followers_count
    #print("step 8", followers_count)
    friends_count = user_info_dict.friends_count
    #print("step 9", friends_count)
    description = user_info_dict.description
    #print("step 10", description)

    twitter_user_model = TwitterModel.objects.create(email = user_email, name = name, user_id = user_id, screen_name = screen_name, description = description, 
    followers_count = followers_count, friends_count = friends_count, auth_token = auth_token, auth_token_secret = auth_token_secret)

    #print("no twitter model problem")
    #send back to frontend auth_token, screen_name, name

    info_dict = {
        'auth_token': auth_token, 
        'screen_name': screen_name,
        'name': name,
        'user_id' : user_id,
        'followers_count' : followers_count,
        'friends_count' : friends_count,
        'description' : description,
        'auth_token' : auth_token
    }

    #print(info_dict)
    
    try:
        info_json = json.dumps(info_dict)
        #print(info_json)
    except Exception as e:
        print("error: ", e)
    
    return Response({info_json}, status=status.HTTP_202_ACCEPTED)
    
    #except:
        #return Response({'message': 'twitter authentication failed'}, status=status.HTTP_401_UNAUTHORIZED)