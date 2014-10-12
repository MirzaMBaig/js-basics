//  JSON data to build the elements.

//  Work data.
var work = {
  "jobs": [
    {
      "employer": "AT&T",
      "title": "Lead Consultant HR Technology",
      "location": "Rock Island, Illinois",
      "dates": "2000 - Present",
      "description": "Manage, build, and deploy technology projects."
    },
    {
      "employer": "H&R Accounts",
      "title": "Bill Collector",
      "location": "Moline, Illinois",
      "dates": "1997 - 2000",
      "description": "Skip trace and collect unpaid accounts."
    },
    {
      "employer": "Arby's Restaurant",
      "title": "Assistant Manager",
      "location": "Moline, Illinois",
      "dates": "1996-1997",
      "description": "Manage employees, schedules, inventory, money, and service."
    },
    {
      "employer": "American Inventory",
      "title": "Supervisor",
      "location": "Davenport, Iowa",
      "dates": "1995-1996",
      "description": "Manage employees, schedules, and inventory clients' stores."
    },
    {
      "employer": "President Riverboat and Casino",
      "title": "Cage Cashier",
      "location": "Davenport, Iowa",
      "dates": "1994-1995",
      "description": "Sell, and cash-in, tokens and chips."
    },
    {
      "employer": "Jewel Food Stores",
      "title": "Service Desk",
      "location": "East Moline, Illinois",
      "dates": "1992-1994",
      "description": "Manage employees, schedules, money, and service."
    },
    {
      "employer": "Taco Bell",
      "title": "Cashier/Front-Line",
      "location": "Moline, Illinois",
      "dates": "1991-1992",
      "description": "Take orders and prepare food."
    }
  ]
};

//  Projects data.
var projects = {
  "projects": [
    {
      "title": "Favorite App",
      "dates": "2014",
      "description": "This was my first project in Intro to HTML and CSS. I learned a lot about HTML and CSS.",
      "images": ["images/project 1.png"]
    },
    {
      "title": "Framework",
      "dates": "2014",
      "description": "My second project was to build my own small CSS framework I could use for future projects. I used my framework to create the first version of my portfolio page.",
      "images": ["images/project 2.png"]
    },
    {
      "title": "Portfolio",
      "dates": "2014",
      "description": "In this project I learned how to use Bootstrap & Modals.  I applied them to the first and second versions of the portfolio page.",
      "images": ["images/project 3-1.png", "images/project 3-2.png", "images/project 3-3.png", "images/project 3-4.png"]
    },
    {
      "title": "Resume",
      "dates": "2014",
      "description": "In this project I learned how to use JavaScript to create an online resume.",
      "images": ["images/project 4.png"]
    }
  ]
};

//  Bio data.
var bio = {
  "name": "Paul Chehak",
  "role": "Web Developer",
  "pic": "images/photo.jpg",
  "welcomeMessage": "I can learn and do ANYTHING faster than ANYONE!  :)",
  "contacts": {
    "mobile": "309-716-6307",
    "email": "pauly13@sbcglobal.net",
    "twitter": "",
    "github": "richpauly13",
    "blog": "",
    "location": "Rock Island, Illinois"
  },
  "skills": ["Python", "Java", "JavaScript", "HTML 5", "CSS", "Sharepoint", "Sharepoint Designer", "Excel"]
};

//  Education data.
var education = {
  "schools": [
    {
      "name": "Black Hawk College",
      "location": "Moline, Illinois",
      "degree": "No Degree",
      "majors": ["Accounting", "Psychology"],
      "dates": "1993-1995",
      "url": "http://www.bhc.edu/"
    }
  ],
  "onlineCourses": [
    {
      "title": "JavaScript Basics",
      "school": "Udacity",
      "dates": "2014",
      "url": "https://www.udacity.com/course/ud804"
    },
    {
      "title": "Intro to HTML and CSS",
      "school": "Udacity",
      "dates": "2014",
      "url": "https://www.udacity.com/course/ud304"
    },
    {
      "title": "Cyber Security: Protect and Defend",
      "school": "Udemy",
      "dates": "2014",
      "url": "https://www.udemy.com/cyber-security/"
    },
    {
      "title": "Intro to Java Programming",
      "school": "Udacity",
      "dates": "2014",
      "url": "https://www.udacity.com/course/cs046"
    },
    {
      "title": "Intro to Computer Science",
      "school": "Udacity",
      "dates": "2014",
      "url": "https://www.udacity.com/course/cs101"
    }
  ]
};

bio.display = function() {
  var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
  var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
  var formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
  var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
  var formattedBlog = HTMLblog.replace("%data%", bio.contacts.blog);
  var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
  $(".flex-box").append(formattedMobile);
  $(".flex-box").append(formattedEmail);
  $(".flex-box").append(formattedTwitter);
  $(".flex-box").append(formattedGithub);
  $(".flex-box").append(formattedBlog);
  $(".flex-box").append(formattedLocation);

  var formattedName = HTMLheaderName.replace("%data%", bio.name);
  var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
  var formattedBioPic = HTMLbioPic.replace("%data%", bio.pic);
  var formattedMsg = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);

  $("#header").append(formattedName);
  $("#header").append(formattedRole);
  $("#header").append(formattedBioPic);
  $("#header").append(formattedMsg);

  $("#header").append(HTMLskillsStart);
  $("#skillsChart").append(HTMLchartStart);
  for (skill in bio.skills) {
    var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
    var formattedchartSkill = HTMLchartSkill.replace("%data%", bio.skills[skill]);
    $("#skills").append(formattedSkill);
    $(".skills-entry:last").append(formattedchartSkill);
  }
}

//  Compiles and formats the work section.
work.display = function() {
  for (job in work.jobs) {
    $("#workExperience").append(HTMLworkStart);

    var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
    var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
    var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
    var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
    var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
    
    $(".work-entry:last").append(formattedEmployer + formattedTitle);
    $(".work-entry:last").append(formattedDates);
    $(".work-entry:last").append(formattedLocation);
    $(".work-entry:last").append(formattedDescription);
  }
}

//  Compiles and formats the projects section.
projects.display = function() {
  for (project in projects.projects) {
    $("#projects").append(HTMLprojectStart);

    var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title);
    var formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates);
    var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description);
    
    $(".project-entry:last").append(formattedTitle);
    $(".project-entry:last").append(formattedDates);
    $(".project-entry:last").append(formattedDescription);
    
    if (projects.projects[project].images.length > 0) {
      for (image in projects.projects[project].images) {
        var formattedImage = HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
        $(".project-entry:last").append(formattedImage);
      }
    }
  }
}

//  Compiles and formats the education section.
education.display = function() {
  for (school in education.schools) {
    $("#education").append(HTMLschoolStart);

    var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name);
    var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
    var formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);
    var formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location);
        
    $(".education-entry:last").append(formattedName + formattedDegree);
    $(".education-entry:last").append(formattedDates);
    $(".education-entry:last").append(formattedLocation);

    if (education.schools[school].majors.length > 0) {
      for (major in education.schools[school].majors) {
        var formattedMajor = HTMLschoolMajor.replace("%data%", education.schools[school].majors[major]);
        $(".education-entry:last").append(formattedMajor);
      }
    }
  }
  $("#education").append(HTMLonlineClasses);
  for (course in education.onlineCourses) {
    $("#education").append(HTMLschoolStart);
    
    var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title);
    var formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school);
    var formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);
    var formattedURL = HTMLonlineURL.replace("%data%", education.onlineCourses[course].url);
        
    $(".education-entry:last").append(formattedTitle + formattedSchool);
    $(".education-entry:last").append(formattedDates);
    $(".education-entry:last").append(formattedURL);
  }
}

//  Builds the sections.
bio.display();
work.display();
projects.display();
education.display();

//  Adds a click logger to the console.
$(document).click(function(loc) {
  var x = loc.pageX;
  var y = loc.pageY;
  logClicks(x, y);
});

//  Adds the map section.
$("#mapDiv").append(googleMap);

// Adds expand/collapse to sections.
$(document).ready(function() { 
$('div.view').hide(); 
$('div.slide').click(function() {
$(this).next('div.view').slideToggle('fast'); 
return false; 
}); 
});