'use strict';

const db = require('./db');
const models=require('./db/models');
const Students=models.Student;
const Campuses=models.Campus;


const defaultCampuses=[
    {name:'SONOMA STATE UNIVERSITY',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/sonoma_state_university.jpg'},
    {name:'UNIVERSITY OF MONTANA',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/university_of_montana.jpg'},
    {name:'COLLEGE OF THE HOLY CROSS',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/college_of_the_holy_cross.jpg'},
    {name:'PACIFIC UNION COLLEGE',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/pacific_union_college.jpg'},
    {name:'CONNECTICUT COLLEGE',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/connecticut_college.jpg'},
    {name:'BROOKLYN COLLEGE',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/brooklyn_college.jpg'},
    {name:'MIAMI UNIVERSITY',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/miami_university.jpg'},
    {name:'HAMILTON COLLEGE',image:'https://bestcollegereviews.azureedge.net/wp-content/uploads/2014/09/hamilton_college.jpg'},
  ];

const defaultStudents=[
    {firstName:'Erica',lastName:'Chuang',email:'erica@email.com', image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',campusId:1},
    {firstName:'Monroe',lastName:'Chuang',email:'monroe@email.com', image:'https://www.realholidays.co.uk/app/uploads/2018/10/Matt-Website-Profile-2-300x300-c-default.jpg',campusId:2},
    {firstName:'Lilion',lastName:'Loparty',email:'ace@email.com', image:'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg',campusId:3},
    {firstName:'Tim',lastName:'Jones',email:'bob@email.com', image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Avicii_2014_003.jpg/1200px-Avicii_2014_003.jpg',campusId:4},
    {firstName:'Ann',lastName:'Lively',email:'ann@email.com', image:'https://everipedia-storage.s3.amazonaws.com/NewlinkFiles/179225/1112e___tiffany-del-real/tiffany-del-reals-profile-picture-onnbsptwitter.jfif',campusId:5},
    {firstName:'Holy',lastName:'Toledo',email:'holy@email.com', image:'https://i.pinimg.com/236x/ed/d9/29/edd9291402ca071809b65a6e57592145.jpg',campusId:6},
    {firstName:'Cuppy',lastName:'Loronzo',email:'cupcake@email.com', image:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/lead2-1507729221.jpg?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*',campusId:7},
    {firstName:'Sally',lastName:'Morton',email:'erica@email.com', image:'https://images.statusfacebook.com/profile_pictures/real-desi-girls/real-desi-girls-dp-profile-pictures-for-whatsapp-facebook-03.jpg',campusId:1},
    {firstName:'Bill',lastName:'Gladwell',email:'monroe@email.com', image:'https://www.verywellfamily.com/thmb/kNN_y30o5ity_t-EatOmCI1cI0M=/2121x1414/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-493738798-5873c53e3df78c17b6ef7154.jpg',campusId:2},
    {firstName:'Mary',lastName:'Johnson',email:'ace@email.com', image:'https://edecorati.com/data/out/258/pic-girls_292819965.jpg',campusId:3},
    {firstName:'Tom',lastName:'Rubenstein',email:'bob@email.com', image:'https://www.insidehighered.com/sites/default/server_files/media/iStock-905458156.jpg',campusId:4},
    {firstName:'Sue',lastName:'Vasquez',email:'ann@email.com', image:'https://imgix.bustle.com/uploads/image/2018/5/9/fa2d3d8d-9b6c-4df4-af95-f4fa760e3c5c-2t4a9501.JPG?w=970&h=546&fit=crop&crop=faces&auto=format&q=70',campusId:5},
    {firstName:'Harry',lastName:'Kim',email:'holy@email.com', image:'https://i1.wp.com/profilesio.com/wp-content/uploads/Jade-Tekashi-6ix9ines-Girlfriend.jpg?fit=1034%2C651&ssl=1',campusId:6},
    {firstName:'Liz',lastName:'Choo',email:'cupcake@email.com', image:'http://www.mytvnews.co.za/wp-content/uploads/2019/01/1-e1546507280939.jpg',campusId:7},
    {firstName:'Lawrence',lastName:'Lagerfeld',email:'erica@email.com', image:'http://www.telegraphcommons.com/wp-content/uploads/2015/11/student-with-an-ipad-itunes-u-100609219-orig.jpg',campusId:1},
    {firstName:'Ethan',lastName:'Chuang',email:'monroe@email.com', image:'https://www.youthareawesome.com/wp-content/uploads/2013/08/male-college-student-backpack.jpeg',campusId:2},
    {firstName:'Victoria',lastName:'Ventura',email:'ace@email.com', image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',campusId:3},
    {firstName:'Alice',lastName:'Light',email:'bob@email.com', image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',campusId:4},
    {firstName:'Jasmine',lastName:'Lively',email:'ann@email.com', image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',campusId:5},
    {firstName:'Justin',lastName:'Bieber',email:'holy@email.com', image:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973461_960_720.png',campusId:6},
    {firstName:'Sarah',lastName:'Miller',email:'cupcake@email.com', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAFYHoDSu3b5cMg4KS3yMmYAiHrW0c4U-LO8zqlZoeAXbiQZl4',campusId:7}
];

function seedDB() {
    console.log('Syncing database');

    // dunno how to manage promises here...
    // needed quick and dirty seed
    defaultCampuses.map(campus => {
        // console.log(campus);
        Campuses.create(campus)
        .then(function (data) {
            console.log("DATA",data);
            console.log("++++++++++++++++++++++");
            return data;
        });

    });
    defaultStudents.map(student => {
        Students.create(student)
        .then(function (data) {
            console.log("DATA",data);
            console.log("++++++++++++++++++++++");

        });
    });
}

seedDB();
