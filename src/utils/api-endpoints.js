const endpoints = {
  resume: [
    {
      httpMethod: 'POST',
      path: '/parse-resume',
      description: 'Parse a professional resume into structured JSON data with the help of Large Language Models. Only .pdf files are supported currently.',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'questions',
          type: '[String]',
          value: 'Questions to be asked about the professional resume during the parsing process. Example: "Is this person a software developer?". Each question will return "true", "false"  or "not applicable". Up to 5 questions can be asked.',
        },
        {
          name: 'resumeEncoded',
          type: 'base64String',
          value: 'Base 64 encoded string of the professional resume. See examples for more details.',
        },
      ],
      requestExample: {
        javascript: `
    import fsPromises from 'node:fs/promises';

    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/parse-resume';
    const API_KEY = '$API_KEY';
    const pathToResume = '$PATH_TO_RESUME_FILE';

    const buffer = await fsPromises.readFile(pathToResume);
    const base64String = buffer.toString('base64');
    const questions = ['Is this person a software developer?'];
    const body = JSON.stringify({
      questions,
      resumeEncoded: base64String,
    });

    const req = new Request({
      url: \`\${API_BASE_URL}\${API_PATH}\`,
      method: 'POST',
      body,
      headers: {
        'content-type': 'application/json',
        Authorization: \`Bearer \${API_KEY}\`,
      },
    });
    const response = await fetch(req);
    const result = await response.json();
    console.dir(result, { depth: null }); // to print all levels
      `,
        python: `
    import base64
    import json
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/parse-resume'
    API_KEY = 'YOUR_API_KEY'  # Replace with your actual API key
    path_to_resume = 'PATH_TO_RESUME_FILE'  # Replace with the actual path to your resume file

    # Read the resume file and encode it in base64
    with open(path_to_resume, 'rb') as file:
        buffer = file.read()
        base64_string = base64.b64encode(buffer).decode('utf-8')

    # Prepare the payload
    questions = ['Is this person a software developer?']
    body = json.dumps({
        'questions': questions,
        'resumeEncoded': base64_string,
    })

    # Set the request headers
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}',
    }

    # Send the POST request
    response = requests.post(f'{API_BASE_URL}{API_PATH}', headers=headers, data=body)

    # Parse the JSON response
    result = response.json()
    print(json.dumps(result, indent=4))  # Pretty-print

        `,
        curl: `
    API_BASE_URL='https://api.talentsourcery.io/v1'
    API_PATH='/parse-resume'
    API_KEY='YOUR_API_KEY'  # Replace with your actual API key
    PATH_TO_RESUME='PATH_TO_RESUME_FILE'  # Replace with the actual path to your resume file

    base64_string=$(base64 -w 0 "$PATH_TO_RESUME")

    curl -X POST "\${API_BASE_URL}\${API_PATH}"
      -H "Content-Type: application/json"
      -H "Authorization: Bearer \${API_KEY}"
      -d '{
          "questions": ["Is this person a software developer?"],
          "resumeEncoded": "'"\${base64_string}"'"
      }'

        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "executionTime": "8.854788 s",
        "tokens": {
          "input": {
            "totalTokens": 613
          },
          "output": {
            "totalTokens": 1025
          }
        },
        "resumeText": "STRING",
        "resumeJson": {
          "firstName": "STRING",
          "lastName": "STRING",
          "headline": "STRING",
          "industry": "STRING",
          "summary": "STRING",
          "location": {
            "country": "STRING",
            "countryCode": "LINKEDIN_COUNTRY_CODE",
            "city": "STRING"
          },
          "educations": [
            {
              "schoolName": "STRING",
              "fieldOfStudy": "STRING",
              "degreeName": "STRING",
              "timePeriod": {
                "endDate": {
                  "year": 2023
                },
                "startDate": {
                  "year": 2018
                }
              }
            },
          ],
          "skills": [
            "STRING",
          ],
          "languages": [
            {
              "name": "STRING",
              "proficiency": "STRING"
            },
          ],
          "certifications": [
            {
              "name": "STRING",
              "authority": "STRING",
              "timePeriod": {
                "startDate": {
                  "month": 11,
                  "year": 2017
                }
              }
            },
          ],
          "testScores": [
            {
              "name": "STRING",
              "score": "STRING",
              "description": "STRING",
              "date": {
                "month": 1,
                "year": 2018
              }
            }
          ],
          "courses": [
            {
              "name": "STRING",
              "authority": "STRING"
            },
          ],
          "honors": [
            {
              "title": "STRING",
              "description": "STRING",
              "issuer": "STRING",
              "issueDate": {
                "month": 1,
                "year": 2018
              }
            },
          ],
          "experiences": [
            {
              "title": "STRING",
              "locationName": "STRING",
              "companyName": "STRING",
              "timePeriod": {
                "startDate": {
                  "month": 1,
                  "year": 2018
                }
              }
            },
          ],
          "projects": [
            {
              "title": "STRING",
              "description": "STRING",
              "timePeriod": {
                "endDate": {
                  "month": 1,
                  "year": 2018
                },
                "startDate": {
                  "month": 12,
                  "year": 2018
                }
              }
            },
          ],
          "volunteerCauses": [
            {
              "name": "STRING",
              "type": "STRING"
            },
          ],
          "volunteerExperiences": [
            {
              "role": "STRING",
              "description": "STRING",
              "cause": "STRING",
              "companyName": "STRING",
              "timePeriod": {
                "endDate": {
                  "month": 12,
                  "year": 2018
                },
                "startDate": {
                  "month": 1,
                  "year": 2018
                }
              }
            }
          ],
          "publications": [
            {
              "name": "STRING",
              "description": "STRING",
              "publisher": "STRING",
              "url": "STRING",
              "date": {
                "year": 2018
              }
            }
          ],
          "patents": [
            {
              "title": "STRING",
              "description": "STRING",
              "issuer": "STRING",
              "localizedIssuerCountryName": "STRING",
              "url": "STRING",
              "pending": "STRING",
              "date": {
                "year": 2018                  
              }
            }
          ],
          "contactInfo": {
            "address": "-",
            "birthDateOn": {
              "month": 2,
              "day": 7
            },
            "emailAddresses": [STRING],
            "phoneNumbers": [STRING],
            "websites": [
              {
                "url": "STRING",
                "category": "-",
                "label": "-"
              }
            ],
          }
          "socialNetworks": {
            "linkedin": "linkedin.com/LINKEDIN_ID",
            "twitter": "STRING",
            "instagram": "STRING"
          },
          "questions": [
            "true"
          ]  
      },
      "error": null
    }
      `,
    },
  ],
  linkedin: [
    {
      httpMethod: 'POST',
      path: '/copy/linkedin/person',
      description: 'Copy a person profile.',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'URL or public identifier of the LinkedIn person profile. Can be found after the last / in the URL string. Example: in the URL https://www.linkedin.com/in/my_name the id is my_name',
        },
        {
          name: 'locale',
          type: 'String',
          value: '(Optional) Locale of the target profile. This property is useful to lock onto a profile language, in case the target has multiple profiles in different languages. Can be "pt_BR" or "en_US", defaults to "pt_BR".',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/linkedin/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$PROFILE_ID' }),
      }
    );
    const profile = await response.json();
    console.dir(profile, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/linkedin/person'
    API_KEY = '$API_KEY'
    PROFILE_ID = '$PROFILE_ID'
    
    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {'id': PROFILE_ID}
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        profile = response.json()
        print(profile)
    else:
        print(f"Failed to retrieve the profile. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/linkedin/person"
    API_KEY="$API_KEY"
    PROFILE_ID="$PROFILE_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$PROFILE_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "publicIdentifier": "STRING",
        "pictureUrls": {
          "sm": "STRING",
          "md": "STRING",
          "lg": "STRING",
          "xl": "STRING",
        },
        "firstName": "STRING",
        "lastName": "STRING",
        "headline": "STRING",
        "industry": "STRING",
        "summary": "STRING",
        "location": {
          "country": "STRING",
          "countryCode": "LINKEDIN_COUNTRY_CODE",
          "city": "STRING"
        },
        "educations": [
          {
            "schoolName": "STRING",
            "fieldOfStudy": "STRING",
            "degreeName": "STRING",
            "timePeriod": {
              "endDate": {
                "year": 2023
              },
              "startDate": {
                "year": 2018
              }
            }
          },
        ],
        "skills": [
          "STRING",
        ],
        "languages": [
          {
            "name": "STRING",
            "proficiency": "STRING"
          },
        ],
        "certifications": [
          {
            "name": "STRING",
            "authority": "STRING",
            "timePeriod": {
              "startDate": {
                "month": 11,
                "year": 2017
              }
            }
          },
        ],
        "testScores": [
          {
            "name": "STRING",
            "score": "STRING",
            "description": "STRING",
            "date": {
              "month": 1,
              "year": 2018
            }
          }
        ],
        "courses": [
          {
            "name": "STRING",
            "authority": "STRING"
          },
        ],
        "honors": [
          {
            "title": "STRING",
            "description": "STRING",
            "issuer": "STRING",
            "issueDate": {
              "month": 1,
              "year": 2018
            }
          },
        ],
        "experiences": [
          {
            "title": "STRING",
            "locationName": "STRING",
            "companyName": "STRING",
            "timePeriod": {
              "startDate": {
                "month": 1,
                "year": 2018
              }
            }
          },
        ],
        "projects": [
          {
            "title": "STRING",
            "description": "STRING",
            "timePeriod": {
              "endDate": {
                "month": 1,
                "year": 2018
              },
              "startDate": {
                "month": 12,
                "year": 2018
              }
            }
          },
        ],
        "volunteerCauses": [
          {
            "name": "STRING",
            "type": "STRING"
          },
        ],
        "volunteerExperiences": [
          {
            "role": "STRING",
            "description": "STRING",
            "cause": "STRING",
            "companyName": "STRING",
            "timePeriod": {
              "endDate": {
                "month": 12,
                "year": 2018
              },
              "startDate": {
                "month": 1,
                "year": 2018
              }
            }
          }
        ],
        "publications": [
          {
            "name": "STRING",
            "description": "STRING",
            "publisher": "STRING",
            "url": "STRING",
            "date": {
              "year": 2018
            }
          }
        ],
        "patents": [
          {
            "title": "STRING",
            "description": "STRING",
            "issuer": "STRING",
            "localizedIssuerCountryName": "STRING",
            "url": "STRING",
            "pending": "STRING",
            "date": {
              "year": 2018                  
            }
          }
        ],
        "contactInfo": {
          "address": "-", // Will never return an actual address for security/privacy reasons 
          "birthDateOn": {
            "month": 2,
            "day": 7
          },
          "emailAddress": "user@domain.com",
          "weChatContactInfo": "-",
          "phoneNumbers": [],
          "twitterHandles": [],
          "websites": [
            {
              "url": "STRING",
              "category": "-",
              "label": "-"
            }
          ],
          "instantMessengers": []
        }
        "isOpenToWork": BOOLEAN,
        "isHiring": BOOLEAN
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/copy/linkedin/job',
      description: 'Copy a job profile.',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'Public identifier of the LinkedIn job profile. Can be found in the jobs section of a company profile. It usually looks like a number',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/linkedin/job';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$JOB_ID' }),
      }
    );
    const job = await response.json();
    console.dir(job, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/linkedin/job'
    API_KEY = '$API_KEY'
    JOB_ID = '$JOB_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': JOB_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        job = response.json()
        print(job)
    else:
        print(f"Failed to retrieve the job. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/linkedin/job"
    API_KEY="$API_KEY"
    JOB_ID="$JOB_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$JOB_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        {
          "title": "STRING",
          "description": "STRING",
          "location": "STRING",
          "companyName": "STRING",
          "experienceLevel": "STRING",
          "industries": [
            "STRING"
          ],
          "jobFunctions": [
            "STRING",
          ],
          "companyApplyUrl": "STRING",
          "employmentStatus": "STRING",
          "numberOfApplicants": NUMBER,
          "numberOfViewers": NUMBER,
          "listedAt": NUMBER
        }
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/copy/linkedin/company',
      description: 'Copy a company profile.',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'URL or public identifier of the LinkedIn company profile. Can be found in the company profile URL',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/linkedin/company';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$COMPANY_ID' }),
      }
    );
    const company = await response.json();
    console.dir(company, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/linkedin/company'
    API_KEY = '$API_KEY'
    COMPANY_ID = '$COMPANY_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': COMPANY_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        company = response.json()
        print(company)
    else:
        print(f"Failed to retrieve the company. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/linkedin/company"
    API_KEY="$API_KEY"
    COMPANY_ID="$COMPANY_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$COMPANY_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "name": "STRING",
        "description": "STRING",
        "isActive": true,
        "specialties": [
          "STRING",
        ],
        "industries": [
          "STRING"
        ],
        "employeeCountRange": "11-50",
        "headquarters": "STRING",
        "companyType": "STRING",
        "foundedDate": {
          "year": 2018
        }
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/copy/linkedin/post',
      description: 'Copy posts from a person profile.',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'URL or public identifier of the LinkedIn person profile. Can be found after the last / in the URL string. Example: in the URL https://www.linkedin.com/in/my_name the id is my_name',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/linkedin/post';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$PROFILE_ID' }),
      }
    );
    const posts = await response.json();
    console.dir(posts, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/linkedin/post'
    API_KEY = '$API_KEY'
    PROFILE_ID = '$PROFILE_ID'
    
    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {'id': PROFILE_ID}
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        profile = response.json()
        print(profile)
    else:
        print(f"Failed to retrieve the posts. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/linkedin/post"
    API_KEY="$API_KEY"
    PROFILE_ID="$PROFILE_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$PROFILE_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "authored": {
          "title": "STRING",
          "permaLink": "STRING",
          "text": "STRING",
          "numLikes": "NUMBER",
          "numComments": "NUMBER",
          "createdDate": {
            "month": 7,
            "day": 1,
            "year": 2017
          },
          "postedDate": {
            "month": 7,
            "day": 1,
            "year": 2017
          }
        },
        "reposts": {
          "text": "STRING",
          "shareLink": "STRING",
          "numLikes": 9,
          "numComments": 1,
          "numShares": 3
        }
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/list/linkedin/job',
      description: 'List jobs in a company from LinkedIn',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'Public identifier of the LinkedIn company profile. Can be found in the company profile URL',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/list/linkedin/job';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$COMPANY_ID' }),
      }
    );
    const company = await response.json();
    console.dir(company, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/list/linkedin/job'
    API_KEY = '$API_KEY'
    COMPANY_ID = '$COMPANY_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': COMPANY_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        company = response.json()
        print(company)
    else:
        print(f"Failed to retrieve the company. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/list/linkedin/job"
    API_KEY="$API_KEY"
    COMPANY_ID="$COMPANY_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$COMPANY_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": [
        "STRING",
      ],
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/search/linkedin/person',
      description: 'Search people in LinkedIn. The search works by creating a boolean string with the keywords in the body that is then sent to the Google and Bing search engines',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'searchName',
          type: 'String',
          value: 'Name of the search',
        },
        {
          name: 'location.country',
          type: 'String',
          value: 'Country of the search',
        },
        {
          name: 'location.countryCode',
          type: 'String',
          value: 'LinkedIn country code',
        },
        {
          name: 'location.city',
          type: 'String',
          value: 'City or region of the search',
        },
        {
          name: 'Job title to look for',
          type: 'String',
          value: 'Job title',
        },
        {
          name: 'keywords',
          type: '[String]',
          value: 'Array of keywords that will assemble the search. It is recommend to not put many keywords here, best results come from 2 to 5 keywords',
        },
        {
          name: 'unwantedKeywords',
          type: '[String]',
          value: 'Remove profiles with the keywords listed. Powerful field, use wisely',
        },
        {
          name: 'returnAllProfiles',
          type: 'Boolean',
          value: 'Boolean flag to return the complete profiles of the people found, alongside their profile URLs. Defaults to false',
        },
        {
          name: 'returnFirstTenProfiles',
          type: 'Boolean',
          value: 'Boolean flag to return the first ten profiles of the people found. Defaults to false',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/search/linkedin/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchName: 'Software engineers in NYC',
          location: {
            country: 'United States',
            countryCode: 'www',
            city: 'New York'
          },
          jobTitle: 'Software Engineer',
          keywords: [
            'JavaScript',
            'Node.js',
            'React'
          ],
          unwantedKeywords: [
            'freelancer'
          ],
          returnAllProfiles: false,
          returnFirstTenProfiles: false
        }),
      }
    );
    const matches = await response.json();
    console.dir(matches, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/search/linkedin/person'
    API_KEY = '$API_KEY'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'searchName': 'Software engineers in NYC',
        'location': {
            'country': 'United States',
            'countryCode': 'www',
            'city': 'New York'
        },
        'jobTitle': 'Software Engineer',
        'keywords': ['JavaScript', 'Node.js', 'React'],
        'unwantedKeywords': ['freelancer'],
        'returnAllProfiles': False,
        'returnFirstTenProfiles': False
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        matches = response.json()
        print(matches)
    else:
        print(f"Failed to retrieve matches. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/search/linkedin/person"
    API_KEY="$API_KEY"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "searchName": "Software engineers in NYC",
        "location": {
            "country": "United States",
            "countryCode": "www",
            "city": "New York"
        },
        "jobTitle": "Software Engineer",
        "keywords": ["JavaScript", "Node.js", "React"],
        "unwantedKeywords": ["freelancer"],
        "returnAllProfiles": false,
        "returnFirstTenProfiles": false
    }'
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "email": "email@domain.com",
        "source": "LinkedIn",
        "action": "Search",
        "type": "Person",
        "form": {
          "searchName": "Software Engineer",
          "location": {
            "country": "United States",
            "countryCode": "www",
            "city": "NYC"
          },
          "jobTitle": "Software Engineer",
          "keywords": [
            "JavaScript",
            "Node.js",
            "React"
          ],
          "unwantedKeywords": [],
          "returnAllProfiles": false,
          "returnFirstTenProfiles": false
        },
        "data": {
          "searchStrings": {
            "internal": "Not implemented yet",
            "google": "site:br.linkedin.com/in \\"Software Engineer\\" \\"JavaScript\\" \\"Node.js\\" \\"React\\" \\"NYC\\"",
            "bing": "site:br.linkedin.com/in \\"Software Engineer\\" \\"JavaScript\\" \\"Node.js\\" \\"React\\" \\"NYC\\""
          },
          "talentInfo": {
            "numberOfMatches": NUMBER,
            "matches": [
              {
                "username": "STRING",
                "url": "https://linkedin.com/in/$USERNAME",
                "searchEngines": {
                  "google": true,
                  "bing": false
                }
              },
              ...
            ],
            "profiles": [],
            "profilesCsv": ""
          }
        },
        "billing": {
          "plan": "Pay as you go",
          "paid": false
        },
        "createdAt": {
          "readableDate": "Tue, 10 Oct 2023 19:58:11 GMT",
          "isoDate": "2023-10-10T19:58:11.906Z",
          "month": 10,
          "year": 2023
        },
        "_id": "STRING",
        "__v": 0
      },
      "error": null
    }
      `,
    },
  ],
  github: [
    {
      httpMethod: 'POST',
      path: '/copy/github/person',
      description: 'Copy a person profile from GitHub',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'Public identifier of the GitHub person profile',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/github/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$PROFILE_ID' }),
      }
    );
    const profile = await response.json();
    console.dir(profile, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/github/person'
    API_KEY = '$API_KEY'
    PROFILE_ID = '$PROFILE_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': PROFILE_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        profile = response.json()
        print(profile)
    else:
        print(f"Failed to retrieve the profile. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/github/person"
    API_KEY="$API_KEY"
    PROFILE_ID="$PROFILE_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$PROFILE_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "name": "STRING",
        "emailInProfile": "email@domain.com",
        "emailInCommits": "email@domain.com",
        "hireable": "true",
        "username": "STRING",
        "url": "https://github.com/$USERNAME",
        "company": "STRING",
        "location": "STRING",
        "bio": "STRING",
        "website": "STRING",
        "publicRepos": NUMBER,
        "publicGists": NUMBER,
        "followers": NUMBER,
        "following": NUMBER,
        "twitter": "STRING",
        "createdAt": "2018-01-01"
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/search/github/person',
      description: 'Search people in GitHub. The search works by creating a boolean string with the keywords in the body that is then sent to the Google and Bing search engines',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'searchName',
          type: 'String',
          value: 'Name of the search',
        },
        {
          name: 'location',
          type: 'String',
          value: 'Location of the search',
        },
        {
          name: 'language',
          type: 'String',
          value: 'Main programming language to look for',
        },
        {
          name: 'keywords',
          type: '[String]',
          value: 'Array of keywords that will assemble the search. It is recommend to not put many keywords here, best results come from 2 to 5 keywords',
        },
        {
          name: 'repos',
          type: 'String',
          value: 'An expression denoting the number of public repositories. Examples: >10, <100, 1..100',
        },
        {
          name: 'followers',
          type: 'String',
          value: 'An expression denoting the number of followers. Examples: >10, <100, 1..100',
        },
        {
          name: 'sort',
          type: 'String',
          value: 'One of: Best match, Most followers, Fewest followers, Most recently joined, Least recently joined, Most repositories, Fewest repositories',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/search/github/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchName: 'Software engineers in NYC',
          location: {
            country: 'United States',
            countryCode: 'www',
            city: 'New York'
          },
          jobTitle: 'Software Engineer',
          keywords: [
            'JavaScript',
            'Node.js',
            'React'
          ],
          unwantedKeywords: [
            'freelancer'
          ],
          returnAllProfiles: false,
          returnFirstTenProfiles: false
        }),
      }
    );
    const matches = await response.json();
    console.dir(matches, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/search/github/person'
    API_KEY = '$API_KEY'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'searchName': 'Software engineers in NYC',
        'location': {
            'country': 'United States',
            'countryCode': 'www',
            'city': 'New York'
        },
        'jobTitle': 'Software Engineer',
        'keywords': ['JavaScript', 'Node.js', 'React'],
        'unwantedKeywords': ['freelancer'],
        'returnAllProfiles': False,
        'returnFirstTenProfiles': False
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        matches = response.json()
        print(matches)
    else:
        print(f"Failed to retrieve matches. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/search/github/person"
    API_KEY="$API_KEY"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "searchName": "Software engineers in NYC",
        "location": {
            "country": "United States",
            "countryCode": "www",
            "city": "New York"
        },
        "jobTitle": "Software Engineer",
        "keywords": ["JavaScript", "Node.js", "React"],
        "unwantedKeywords": ["freelancer"],
        "returnAllProfiles": false,
        "returnFirstTenProfiles": false
    }'
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "email": "email@domain.com",
        "source": "LinkedIn",
        "action": "Search",
        "type": "Person",
        "form": {
          "searchName": "Software Engineer",
          "location": {
            "country": "United States",
            "countryCode": "www",
            "city": "NYC"
          },
          "jobTitle": "Software Engineer",
          "keywords": [
            "JavaScript",
            "Node.js",
            "React"
          ],
          "unwantedKeywords": [],
          "returnAllProfiles": false,
          "returnFirstTenProfiles": false
        },
        "data": {
          "searchStrings": {
            "internal": "Not implemented yet",
            "google": "site:br.linkedin.com/in \\"Software Engineer\\" \\"JavaScript\\" \\"Node.js\\" \\"React\\" \\"NYC\\"",
            "bing": "site:br.linkedin.com/in \\"Software Engineer\\" \\"JavaScript\\" \\"Node.js\\" \\"React\\" \\"NYC\\""
          },
          "talentInfo": {
            "numberOfMatches": NUMBER,
            "matches": [
              {
                "username": "STRING",
                "url": "https://linkedin.com/in/$USERNAME",
                "searchEngines": {
                  "google": true,
                  "bing": false
                }
              },
              ...
            ],
            "profiles": [],
            "profilesCsv": ""
          }
        },
        "billing": {
          "plan": "Pay as you go",
          "paid": false
        },
        "createdAt": {
          "readableDate": "Tue, 10 Oct 2023 19:58:11 GMT",
          "isoDate": "2023-10-10T19:58:11.906Z",
          "month": 10,
          "year": 2023
        },
        "_id": "STRING",
        "__v": 0
      },
      "error": null
    }
      `,
    },
  ],
  dribbble: [
    {
      httpMethod: 'POST',
      path: '/copy/dribbble/person',
      description: 'Copy a person profile from Dribbble',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'Public identifier of the Dribbble person profile',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/dribbble/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$PROFILE_ID' }),
      }
    );
    const profile = await response.json();
    console.dir(profile, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/dribbble/person'
    API_KEY = '$API_KEY'
    PROFILE_ID = '$PROFILE_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': PROFILE_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        profile = response.json()
        print(profile)
    else:
        print(f"Failed to retrieve the profile. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/dribbble/person"
    API_KEY="$API_KEY"
    PROFILE_ID="$PROFILE_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$PROFILE_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "id": "STRING",
        "name": "STRING",
        "intro": "STRING",
        "bio": [
          "STRING",
        ],
        "isCompany": false,
        "isPro": true,
        "url": "STRING",
        "location": "STRING",
        "skills": [
          "STRING",
        ],
        "socialMedias": [
          "STRING",
        ],
        "createdAt": "Aug 2016",
        "specialization": "STRING"
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/copy/dribbble/company',
      description: 'Copy a team profile from Dribbble',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'id',
          type: 'String',
          value: 'Public identifier of the Dribbble team profile',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/copy/dribbble/company';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: '$PROFILE_ID' }),
      }
    );
    const profile = await response.json();
    console.dir(profile, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/copy/dribbble/company'
    API_KEY = '$API_KEY'
    PROFILE_ID = '$PROFILE_ID'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {'id': PROFILE_ID}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        profile = response.json()
        print(profile)
    else:
        print(f"Failed to retrieve the profile. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/copy/dribbble/company"
    API_KEY="$API_KEY"
    PROFILE_ID="$PROFILE_ID"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"id\":\"$PROFILE_ID\"}"
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "id": "STRING",
        "name": "STRING",
        "intro": "STRING",
        "bio": [
          "STRING"
        ],
        "isCompany": true,
        "isPro": true,
        "url": "STRING",
        "location": "STRING",
        "skills": [
          "STRING"
        ],
        "socialMedias": [
          "STRING"
        ],
        "createdAt": "Jun 2011",
        "company": "STRING",
        "members": [
          "STRING"
        ]
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/search/dribbble/person',
      description: 'Search people in Dribbble. The search works by creating a boolean string with the keywords in the body that is then sent to the Google and Bing search engines',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'searchName',
          type: 'String',
          value: 'Name of the search',
        },
        {
          name: 'location',
          type: 'String',
          value: 'Location of the search',
        },
        {
          name: 'keywords',
          type: '[String]',
          value: 'Array of keywords that will assemble the search. It is recommend to not put many keywords here, best results come from 2 to 5 keywords',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/search/dribbble/person';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchName: 'Figma designers in NYC',
          location: 'NYC',
          keywords: [
            'Figma',
          ],
        }),
      }
    );
    const matches = await response.json();
    console.dir(matches, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/search/dribbble/person'
    API_KEY = '$API_KEY'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'searchName': 'Figma designers in NYC',
        'location': 'NYC',
        'keywords': ['Figma'],
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        matches = response.json()
        print(matches)
    else:
        print(f"Failed to retrieve matches. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/search/dribbble/person"
    API_KEY="$API_KEY"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "searchName": "Figma designers in NYC",
        "location": "NYC",
        "keywords": ["Figma"]
    }'
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "email": "email@domain.com",
        "source": "Dribbble",
        "action": "Search",
        "type": "Person",
        "form": {
          searchName: 'STRING',
          location: "STRING",
          keywords: [
            "STRING",
          ],
        },
        "data": {
          "searchStrings": {
            "internal": "STRING",
            "google": "STRING",
            "bing": "STRING"
          },
          "talentInfo": {
            "numberOfMatches": NUMBER,
            "matches": [
              {
                "username": "STRING",
                "searchEngines": {
                  "google": true,
                  "bing": false
                }
              },
            ],
            "profiles": [],
          }
        },
        "billing": {
          "plan": "Pay as you go",
          "paid": false
        },
        "createdAt": {
          "readableDate": "Tue, 10 Oct 2023 19:58:11 GMT",
          "isoDate": "2023-10-10T19:58:11.906Z",
          "month": 10,
          "year": 2023
        },
        "_id": "STRING",
        "__v": 0
      },
      "error": null
    }
      `,
    },
    {
      httpMethod: 'POST',
      path: '/search/dribbble/company',
      description: 'Search design teams in Dribbble. The search works by creating a boolean string with the keywords in the body that is then sent to the Google and Bing search engines',
      headers: {
        Authorization: 'Bearer $API_KEY',
        'Content-Type': 'application/json',
      },
      body: [
        {
          name: 'searchName',
          type: 'String',
          value: 'Name of the search',
        },
        {
          name: 'location',
          type: 'String',
          value: 'Location of the search',
        },
        {
          name: 'keywords',
          type: '[String]',
          value: 'Array of keywords that will assemble the search. It is recommend to not put many keywords here, best results come from 2 to 5 keywords',
        },
      ],
      requestExample: {
        javascript: `
    const API_BASE_URL = 'https://api.talentsourcery.io/v1';
    const API_PATH = '/search/dribbble/company';
    const API_KEY = '$API_KEY';

    const response = await fetch(
      \`\${API_BASE_URL}\${API_PATH}\`,
      {
        method: 'POST',
        headers: {
          Authorization: \`Bearer \${API_KEY}\`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchName: 'Figma teams in NYC',
          location: "STRING",
          keywords: [
            'Figma',
          ],
        }),
      }
    );
    const matches = await response.json();
    console.dir(matches, { depth: null }); // To print all levels
      `,
        python: `
    import requests

    API_BASE_URL = 'https://api.talentsourcery.io/v1'
    API_PATH = '/search/dribbble/company'
    API_KEY = '$API_KEY'

    url = f'{API_BASE_URL}{API_PATH}'
    headers = {
        'Authorization': f'Bearer {API_KEY}',
        'Content-Type': 'application/json'
    }

    data = {
        'searchName': 'Figma teams in NYC',
        'location': 'STRING',
        'keywords': ['Figma'],
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        matches = response.json()
        print(matches)
    else:
        print(f"Failed to retrieve matches. Status code: {response.status_code}")
        `,
        curl: `
    API_BASE_URL="https://api.talentsourcery.io/v1"
    API_PATH="/search/dribbble/company"
    API_KEY="$API_KEY"

    curl -X POST "\${API_BASE_URL}\${API_PATH}" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
        "searchName": "Figma teams in NYC",
        "location": "STRING",
        "keywords": ["Figma"]
    }'
        `,
      },
      responseExample: `
    {
      "success": true,
      "data": {
        "email": "email@domain.com",
        "source": "Dribbble",
        "action": "Search",
        "type": "Person",
        "form": {
          searchName: 'STRING',
          location: "STRING",
          keywords: [
            "STRING",
          ],
        },
        "data": {
          "searchStrings": {
            "internal": "STRING",
            "google": "STRING",
            "bing": "STRING"
          },
          "talentInfo": {
            "numberOfMatches": NUMBER,
            "matches": [
              {
                "username": "STRING",
                "searchEngines": {
                  "google": true,
                  "bing": false
                }
              },
            ],
            "profiles": [],
          }
        },
        "billing": {
          "plan": "Pay as you go",
          "paid": false
        },
        "createdAt": {
          "readableDate": "Tue, 10 Oct 2023 19:58:11 GMT",
          "isoDate": "2023-10-10T19:58:11.906Z",
          "month": 10,
          "year": 2023
        },
        "_id": "STRING",
        "__v": 0
      },
      "error": null
    }
      `,
    },
  ]
};

export default endpoints;