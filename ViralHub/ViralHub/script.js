/* ---------- icons ---------- */
const I = {
 home:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20z"/></svg>',
 compass:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg>',
 bell:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
 user:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 heart:'<svg width="33" height="33" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/></svg>',
 cmt:'<svg width="31" height="31" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20.5l1.6-4.8A8.3 8.3 0 0 1 3.6 11 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',
 share:'<svg width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="m8.4 10.7 7.2-4.2M8.4 13.3l7.2 4.2"/></svg>',
 note:'<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="3"/><circle cx="17.5" cy="16" r="3"/></svg>',
 heartFill:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/></svg>',
 bigHeart:'<svg width="112" height="112" viewBox="0 0 24 24" fill="currentColor"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/></svg>',
 verified:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.3 1.7 2.8-.3 1 2.7 2.4 1.5-.8 2.7.8 2.7-2.4 1.5-1 2.7-2.8-.3L12 22l-2.3-1.7-2.8.3-1-2.7L3.5 16l.8-2.7-.8-2.7 2.4-1.5 1-2.7 2.8.3z"/><path d="m8.5 12 2.4 2.4 4.6-4.8" stroke="#08080b" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const T = {
 EYE:'<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
 BACK:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m0 0 6-6m-6 6 6 6"/></svg>',
 CHECK:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5.5 5.5L20 6"/></svg>',
 GEAR:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.1"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 9 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 4.6 9a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>',
 SEARCH:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 TREND:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff1e56" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="m3 17 6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>',
 UPLOAD:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 9 5-5 5 5M12 4v12"/></svg>',
 LIVE:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="2.4"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2"/></svg>',
 LIVE_BIG:'<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="2.4"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 16.2a6 6 0 0 0 0-8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 19.1a10 10 0 0 0 0-14.2"/></svg>',
 IMGPLUS:'<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m3 16 4.5-4.5 4 4"/><path d="M18 15v6m3-3h-6"/></svg>',
 CAM:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="13" height="12" rx="2.5"/><path d="m15 11 6-3.5v9L15 13z"/></svg>',
 GRID:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>',
 HEART:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5.2 5.2 0 0 0-7.4 0L12 7l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4l8.8 8.8 8.8-8.8a5.2 5.2 0 0 0 0-7.4z"/></svg>',
 BELL:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
 X:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
 SEND:'<svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3 21 12 3 21l3.2-9z"/></svg>',
 LINK:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12.2 19"/></svg>',
 FLAG:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22V4s2-1 5-1 5 2 8 2 3-1 3-1v10s0 1-3 1-5-2-8-2-5 1-5 1"/></svg>',
 MOON:'<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>',
 CHEV:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>',
 SHIELD:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>'
};
/* inject icon placeholders used in markup */
const _app = document.getElementById('app');
_app.innerHTML = _app.innerHTML.replace(/\$\{(\w+)\}/g, (m,k)=> T[k] || I[k] || '');
document.getElementById('soundPlayer').addEventListener('error',()=>{document.getElementById('soundStatus').textContent='This original sound could not be played in your browser.';});

/* ---------- data ---------- */
const users = Object.create(null);
const videos = [];
let comments = [];

const nf = n => n>=1000 ? (n/1000).toFixed(1).replace('.0','')+'K' : n;
const av = u => `<div class="av" style="background:${users[u].g}"></div>`;
const vb = i => `<div class="verif">${I.verified}</div>`;

/* ---------- navigation ---------- */
let cur='login', history=['login'];
function go(id){
  if(id===cur) return;
  const a=document.getElementById(cur), b=document.getElementById(id);
  if(!b) return;
  stopFeedPlayback();
  if(typeof closeSheets === 'function') closeSheets();
  if(typeof Social !== 'undefined') Social.onNavigate(id);
  if(typeof Alerts !== 'undefined') Alerts.onNavigate(id);
  a.querySelectorAll('video,audio').forEach(video=>video.pause());
  if(typeof Live !== 'undefined') Live.onNavigate(id,cur);
  a.classList.add('leaving'); a.classList.remove('active');
  setTimeout(()=>a.classList.remove('leaving'),340);
  b.classList.add('active');
  b.querySelectorAll('.scroll').forEach(s=>s.scrollTop=0);
  // Returning to an earlier screen unwinds the stack instead of adding a loop.
  const previous=history.lastIndexOf(id);
  if(previous>=0) history=history.slice(0,previous+1);
  else history.push(id);
  cur=id; syncNav();
  if(id==='home') { layoutInk(); requestAnimationFrame(syncFeedPlayback); }
}
function back(){ go(history.length>1 ? history[history.length-2] : 'home'); }
async function login() {

    const email = document.getElementById("lu").value.trim();
    const password = document.getElementById("lp").value;

    if (!email || !password) {
        toast("Enter your email and password");
        return;
    }

    const { data, error } =
        await db.auth.signInWithPassword({
            email: email,
            password: password
        });

    if (error) {
        console.error("Login error:", error);
        toast("Invalid email or password");
        return;
    }

    try { await refreshSignedInApp(); } catch (error) { console.error(error); toast(error.message || "Could not load your account"); return; }
    document.getElementById("lp").value = "";

    toast("Welcome to ViralHub!");

    go("home");
}
async function signup() {
    const firstname = document.getElementById('sfn').value.trim();
    const lastname = document.getElementById('sln').value.trim();
    const username = document.getElementById('su').value.trim();
    const email = document.getElementById('se').value.trim();
    const password = document.getElementById('sp').value;
    const month = document.getElementById('mm').value;
    const day = document.getElementById('dd').value;
    const year = document.getElementById('yy').value;
    if (!firstname || !lastname || !username || !email || !password) return toast('Please complete all required fields');
    if (!/^[A-Za-z0-9_]{3,30}$/.test(username)) return toast('Username: use 3–30 letters, numbers, or underscores');
    if (password.length < 8) return toast('Use a password with at least 8 characters');
    if (!document.getElementById('terms').classList.contains('on')) return toast('Please accept the Terms of Service');
    let birthdate = null;
    if (year || month || day) {
        if (!year || !month || !day) return toast('Complete your birthdate');
        const date = new Date(Date.UTC(Number(year), Number(month)-1, Number(day)));
        if (date.getUTCFullYear() !== Number(year) || date.getUTCMonth()+1 !== Number(month) || date.getUTCDate() !== Number(day) || date > new Date()) return toast('Enter a valid birthdate');
        birthdate = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }
    if (signupBusy) return;
    signupBusy = true;
    try {
        const { data: existing, error: lookupError } = await db.from('users').select('user_id').eq('username',username).maybeSingle();
        if (lookupError) throw lookupError;
        if (existing) return toast('That username is already taken');
        const { data, error } = await db.auth.signUp({ email, password, options: {
            emailRedirectTo: location.origin + location.pathname,
            data: { firstname, lastname, username, birthdate }
        }});
        if (error) throw error;
        document.getElementById('sp').value = '';
        if (!data.session) {
            go('login');
            toast('Check your email to confirm your account, then log in');
            return;
        }
        await refreshSignedInApp();
        toast('Account created successfully');
    } catch (error) { console.error('Signup failed',error); toast(error.message || 'Could not create account'); }
    finally { signupBusy = false; }
}

async function logout() {
    if(typeof Live !== 'undefined' && !(await Live.beforeLogout())) return;

    const { error } = await db.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
        toast(error.message);
        return;
    }

    history = ["login"];

    go("login");

    toast("Logged out successfully");
}

async function checkSession() {
    const { data, error } = await db.auth.getSession();
    if (error) return toast('Could not restore session');
    if (data.session) await refreshSignedInApp();
}

async function getCurrentProfile() {

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        console.error("No logged-in user");
        return null;
    }

    const { data, error } =
        await db
            .from("users")
            .select("*")
            .eq("user_id", user.id)
            .single();

    if (error) {
        console.error("Profile error:", error);
        return null;
    }

    console.log("ViralHub profile:", data);

    return data;
}

// STEP 15 - DISPLAY REAL USER PROFILE
async function loadUserProfile() {

    const profile = await getCurrentProfile();

    if (!profile) {
        console.error("Could not load profile.");
        return;
    }

    const bioInput =
    document.getElementById("sBio");

    if (bioInput) {
        bioInput.value = profile.bio || "";
    }

    // ========================================
    // DISPLAY BIO ON MY PROFILE PAGE
    // ========================================

    const profileBio =
        document.getElementById("profileBio");

    if (profileBio) {

        profileBio.textContent =
            profile.bio || "No bio yet.";
    }

    const bioCounter =
    document.getElementById("bioCounter");

    if (bioCounter) {
        bioCounter.textContent =
            `${(profile.bio || "").length} / 150`;
    }   

    const profilePicture =
    document.getElementById(
        "settingsProfilePicture"
    );

    const profileFallback =
        document.getElementById(
            "settingsProfileFallback"
        );

    if (profile.profile_picture) {

        profilePicture.src =
            profile.profile_picture;

        profilePicture.style.display =
            "block";

        profileFallback.style.display =
            "none";

    } else {

        profilePicture.style.display =
            "none";

        profileFallback.style.display =
            "flex";
    }

    // ========================================
    // MY PROFILE PAGE - PROFILE PICTURE
    // ========================================

    const profileAvatar =
        document.getElementById("profileAvatar");

    if (profileAvatar) {

        if (profile.profile_picture) {

            profileAvatar.style.backgroundImage =
                `url("${profile.profile_picture}")`;

            profileAvatar.style.backgroundSize =
                "cover";

            profileAvatar.style.backgroundPosition =
                "center";

            profileAvatar.style.backgroundRepeat =
                "no-repeat";

        } else {

            profileAvatar.style.backgroundImage =
                "linear-gradient(140deg,#4a6b8a,#2d3b52)";
        }
    }

    // PROFILE PAGE
    const profileUsername =
        document.getElementById("profileUsername");

    const profileFullName =
        document.getElementById("profileFullName");


    if (profileUsername) {
        profileUsername.textContent = profile.username;
    }

    if (profileFullName) {
        profileFullName.textContent =
            `${profile.firstname} ${profile.lastname}`;
    }


    // SETTINGS PAGE
    const settingsFullName =
        document.getElementById("settingsFullName");

    const settingsHandle =
        document.getElementById("settingsHandle");

    const usernameInput =
        document.getElementById("s1");

    const emailInput =
        document.getElementById("s2");

    const phoneInput =
        document.getElementById("s4");

    const birthdateInput =
        document.getElementById("s5");


    if (settingsFullName) {
        settingsFullName.textContent =
            `${profile.firstname} ${profile.lastname}`;
    }

    if (settingsHandle) {
        settingsHandle.textContent =
            `@${profile.username}`;
    }

    if (usernameInput) {
        usernameInput.value = profile.username || "";
    }

    if (emailInput) {
        emailInput.value = profile.email || "";
    }

    if (phoneInput) {
    phoneInput.value = profile.phone_number || "";
    }

    if (birthdateInput) {
        birthdateInput.value = profile.birthdate || "";
    }

    console.log("Profile displayed successfully!");

    await loadMyProfileStats(
    profile.user_id,
    profile.username
    );
}

// ========================================
// LOAD MY REAL PROFILE STATS
// ========================================

async function loadMyProfileStats(
    userId,
    username
) {

    // --------------------------
    // FOLLOWING
    // --------------------------

    const {
        count: followingCount,
        error: followingError
    } = await db
        .from("following")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq("user_id", userId);

    if (followingError) {

        console.error(
            "Following count error:",
            followingError
        );
    }


    // --------------------------
    // FOLLOWERS
    // --------------------------

    const {
        count: followerCount,
        error: followerError
    } = await db
        .from("following")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq(
            "following_username",
            username
        );

    if (followerError) {

        console.error(
            "Follower count error:",
            followerError
        );
    }


    // --------------------------
    // DISPLAY COUNTS
    // --------------------------

    const followingElement =
        document.getElementById(
            "profileFollowingCount"
        );

    const followerElement =
        document.getElementById(
            "profileFollowerCount"
        );

    const friendsElement =
        document.getElementById(
            "profileFriendsCount"
        );


    if (followingElement) {
        followingElement.textContent =
            followingCount || 0;
    }

    if (followerElement) {
        followerElement.textContent =
            followerCount || 0;
    }

    if (friendsElement) {
        friendsElement.textContent = "0";
    }
}

// ========================================
// PROFILE PICTURE PREVIEW
// ========================================

function profilePictureSelected() {

    const input =
        document.getElementById("profilePictureInput");

    if (!input.files.length) return;

    const file = input.files[0];

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    if (!allowedTypes.includes(file.type)) {
        toast("Please select a JPG, PNG or WebP image");
        input.value = "";
        return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        toast("Profile picture must be under 5 MB");
        input.value = "";
        return;
    }

    const preview =
        document.getElementById(
            "settingsProfilePicture"
        );

    const fallback =
        document.getElementById(
            "settingsProfileFallback"
        );

    preview.src =
        URL.createObjectURL(file);

    preview.style.display = "block";
    fallback.style.display = "none";

    toast("Photo selected");
}

// ========================================
// STEP 22A.9 - LIVE BIO COUNTER
// ========================================

const bioInputCounter =
    document.getElementById("sBio");

if (bioInputCounter) {

    bioInputCounter.addEventListener(
        "input",
        function () {

            const counter =
                document.getElementById(
                    "bioCounter"
                );

            if (counter) {
                counter.textContent =
                    `${this.value.length} / 150`;
            }
        }
    );
}

// ========================================
// STEP 22A.10 - UPLOAD PROFILE PICTURE
// ========================================

async function uploadProfilePicture(user) {

    const input =
        document.getElementById(
            "profilePictureInput"
        );

    // No new photo was selected
    if (!input || !input.files.length) {
        return null;
    }

    const file = input.files[0];

    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();

    const filePath =
        `${user.id}/profile-${Date.now()}.${extension}`;

    console.log(
        "Uploading profile picture:",
        filePath
    );

    const {
        data,
        error
    } = await db.storage
        .from("profile-pictures")
        .upload(
            filePath,
            file,
            {
                cacheControl: "3600",
                upsert: false
            }
        );

    if (error) {

        console.error(
            "Profile picture upload error:",
            error
        );

        throw error;
    }

    console.log(
        "Profile picture uploaded:",
        data
    );

    const { data: publicData } =
        db.storage
            .from("profile-pictures")
            .getPublicUrl(filePath);

    return publicData.publicUrl;
}

// STEP 16 - SAVE PROFILE CHANGES
async function saveProfileChanges() {

    // Get values from Settings page
    const username =
        document.getElementById("s1").value.trim();

    const email =
        document.getElementById("s2").value.trim();

    const phoneNumber =
        document.getElementById("s4").value.trim();

    const birthdate =
        document.getElementById("s5").value;

    const bio =
        document.getElementById("sBio")
            .value
            .trim();


    // Make sure required fields are not empty
    if (!username || !email) {
        toast("Username and email are required");
        return;
    }


    // Get currently logged-in Auth user
    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();


    if (userError || !user) {
        console.error("User error:", userError);
        toast("You must be logged in");
        return;
    }


    console.log("Updating user:", user.id);




// STEP 22A.11 PART B
// PUT THIS HERE

let newProfilePicture = null;

try {

    newProfilePicture =
        await uploadProfilePicture(user);

} catch (error) {

    console.error(
        "Profile photo save error:",
        error
    );

    toast(
        "Could not upload profile picture"
    );

    return;
}



    // Update public.users
    const updates = {

        username: username,

        phone_number:
           phoneNumber || null,

        birthdate:
            birthdate || null,

       bio:
            bio || null
    };


// Only change profile_picture if
// the user actually selected a new photo

    if (newProfilePicture) {

        updates.profile_picture =
            newProfilePicture;
    }


    const { error: profileError } =
        await db
            .from("users")
            .update(updates)
            .eq("user_id", user.id);


    if (profileError) { toast(profileError.message || 'Could not save profile'); return; }

    // Check if the email was changed
    if (email !== user.email) {

    // Change email in Supabase Authentication
    const { error: emailError } =
        await db.auth.updateUser({
            email: email
        });

    if (emailError) {
        console.error(
            "Email update error:",
            emailError
        );

        toast("Email could not be changed");
        return;
    }


    toast('Check your email to confirm the email change');

}


    // Reload profile information
    await loadUserProfile();


    console.log("Profile updated successfully!");

    toast("Changes saved successfully!");
}

// STEP 17 - VIDEO SELECTED
function videoSelected() {

    const fileInput =
        document.getElementById("videoFile");

    const fileName =
        document.getElementById("videoFileName");

    if (!fileInput.files.length) {
        return;
    }

    let file = fileInput.files[0];

    console.log("Selected video:", file);

    fileName.textContent = file.name;

    toast("Video selected");
}

// STEP 17 - UPLOAD VIDEO
async function uploadVideo() {

    const fileInput =
        document.getElementById("videoFile");

    const captionInput =
        document.getElementById("videoCaption");

    const postButton =
        document.getElementById("postVideoBtn");


    // Check if video was selected
    if (!fileInput.files.length) {

        toast("Please select a video first");

        return;
    }


    let file = fileInput.files[0];

    const caption =
        captionInput.value.trim();


    // Get logged-in user
    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();


    if (userError || !user) {

        console.error(
            "User error:",
            userError
        );

        toast("You must be logged in");

        return;
    }


    // Get ViralHub profile
    const profile =
        await getCurrentProfile();


    if (!profile) {

        toast("Could not load your profile");

        return;
    }


    try {

        // Disable button while uploading
        postButton.disabled = true;

        postButton.textContent =
            "Uploading...";


        const chosenSound=Social.selectedSound();
        if(chosenSound) {
            postButton.textContent="Applying sound… keep this tab open";
            file=await Social.applySound(file,chosenSound);
            postButton.textContent="Uploading…";
        }

        // Create unique file name
        const extension =
            file.name.split(".").pop();

        const fileName =
            `${user.id}/${Date.now()}.${extension}`;


        console.log(
            "Uploading:",
            fileName
        );


        // Upload to Supabase Storage
        const {
            data: uploadData,
            error: uploadError
        } =
            await db.storage
                .from("videos")
                .upload(
                    fileName,
                    file,
                    {
                        cacheControl: "3600",
                        upsert: false
                    }
                );


        if (uploadError) {

            console.error(
                "Video upload error:",
                uploadError
            );

            toast(
                "Could not upload video"
            );

            return;
        }


        console.log(
            "Storage upload:",
            uploadData
        );


        // Get public URL
        const {
            data: publicUrlData
        } =
            db.storage
                .from("videos")
                .getPublicUrl(fileName);


        const videoUrl =
            publicUrlData.publicUrl;


        console.log(
            "Video URL:",
            videoUrl
        );


        // Create video database record
        const {
            data: videoData,
            error: videoError
        } =
            await db
                .from("video")
                .insert({

                    user_id: user.id,

                    username:
                        profile.username,

                    caption: caption,

                    video_url:
                        videoUrl,

                    original_sound_id: chosenSound?.id || null,
                    viewcount: 0,

                    privacy_status:
                        "public"
                })
                .select()
                .single();


        if (videoError) {

            console.error(
                "Video database error:",
                videoError
            );

            toast(
                "Video uploaded, but database record failed"
            );

            return;
        }


        console.log(
            "Video saved:",
            videoData
        );


        toast(
            "Video posted successfully!"
        );


        Social.clearSelectedSound();
        // Clear upload form
        fileInput.value = "";

        captionInput.value = "";

        document.getElementById(
            "videoFileName"
        ).textContent =
            "Tap to select a video";


        // Go back to home
        go("home");

        await loadRealFeed();


    } catch (error) {

        console.error(
            "Upload error:",
            error
        );

        toast(
            error.message || "Something went wrong while uploading"
        );

    } finally {

        postButton.disabled = false;

        postButton.textContent = "Post video";
    }
}

// ========================================
// STEP 18 - LOAD REAL VIDEOS FROM SUPABASE
// ========================================

async function loadVideosFromSupabase() {

    console.log("Loading videos from Supabase...");

    const { data, error } = await db
        .from("video")
        .select("*")
        .eq("privacy_status", "public")
        .order("upload_date", {
            ascending: false
        });

    if (error) {

        console.error(
            "Error loading videos:",
            error
        );

        toast("Could not load videos");

        return [];
    }

    console.log(
        "Videos from Supabase:",
        data
    );

    return data || [];
}

// ========================================
// STEP 19 - REAL VIDEO LIKES
// ========================================

async function toggleRealLike(event, button, videoId) {

    event.stopPropagation();

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        toast("Please log in first");
        return;
    }

    const profile = await getCurrentProfile();

    if (!profile) {
        toast("Could not load profile");
        return;
    }

    // Check whether this user already liked the video
    const { data: existingLike, error: checkError } =
        await db
            .from("like")
            .select("user_id, video_id")
            .eq("user_id", user.id)
            .eq("video_id", videoId)
            .maybeSingle();

    if (checkError) {
        console.error("Like check error:", checkError);
        toast("Could not check like");
        return;
    }

    if (existingLike) {

        // Already liked -> remove it

        const { error: deleteError } =
            await db
                .from("like")
                .delete()
                .eq("user_id", user.id)
                .eq("video_id", videoId);

        if (deleteError) {
            console.error("Unlike error:", deleteError);
            toast("Could not remove like");
            return;
        }

        button.classList.remove("liked");

    } else {

        // Not liked -> add it

        const { error: insertError } =
            await db
                .from("like")
                .insert({
                    user_id: user.id,
                    video_id: videoId,
                    username: profile.username
                });

        if (insertError) {
            console.error("Like insert error:", insertError);
            toast("Could not like video");
            return;
        }

        button.classList.add("liked");
    }

    await updateRealLikeCount(videoId);
}

async function updateRealLikeCount(videoId) {

    const { count, error } =
        await db
            .from("like")
            .select("*", {
                count: "exact",
                head: true
            })
            .eq("video_id", videoId);

    if (error) {
        console.error("Like count error:", error);
        return;
    }

    const card = document.querySelector(
        `[data-video-id="${videoId}"]`
    );

    if (!card) return;

    const countElement =
        card.querySelector("[data-likes]");

    if (countElement) {
        countElement.textContent = nf(count || 0);
    }
}
async function loadMyLikeState(videoId) {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) return;

    const { data, error } =
        await db
            .from("like")
            .select("video_id")
            .eq("user_id", user.id)
            .eq("video_id", videoId)
            .maybeSingle();

    if (error) {
        console.error("Like state error:", error);
        return;
    }

    const card = document.querySelector(
        `[data-video-id="${videoId}"]`
    );

    if (!card) return;

    const heart =
        card.querySelector(".heart");

    if (!heart) return;

    heart.classList.toggle(
        "liked",
        !!data
    );
}

// ========================================
// STEP 20 - REAL COMMENTS
// ========================================

let currentCommentVideoId = null;

async function updateRealCommentCount(videoId) { return Social.updateCount(videoId); }
async function openRealComments(event, videoId) {
    event.stopPropagation();
    currentCommentVideoId=videoId;
    Social.selectVideo(videoId);
    openSheet('comments');
    await loadRealComments(videoId);
}
async function loadRealComments(videoId) { return Social.loadComments(videoId); }

// ========================================
// STEP 21 - REAL FOLLOW / UNFOLLOW
// ========================================

async function toggleRealFollow(
    event,
    button,
    creatorId,
    creatorUsername
) {

    event.stopPropagation();
   
    const followBlocked = await checkFollowBlock(creatorId);

    if (followBlocked) {
        return;
    }

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        toast("Please log in first");
        return;
    }

    // Prevent following yourself
    if (user.id === creatorId) {
        toast("You cannot follow yourself");
        return;
    }

    const profile = await getCurrentProfile();

    if (!profile) {
        toast("Could not load profile");
        return;
    }

    // Check if already following
    const { data: existingFollow, error: checkError } =
        await db
            .from("following")
            .select("following_id")
            .eq("user_id", user.id)
            .eq("following_username", creatorUsername)
            .maybeSingle();

    if (checkError) {
        console.error(
            "Follow check error:",
            checkError
        );

        toast("Could not check follow status");
        return;
    }

    if (existingFollow) {

        // ==============================
        // UNFOLLOW
        // ==============================

        const { error: deleteError } =
            await db
                .from("following")
                .delete()
                .eq("user_id", user.id)
                .eq(
                    "following_username",
                    creatorUsername
                );

        if (deleteError) {
            console.error(
                "Unfollow error:",
                deleteError
            );

            toast("Could not unfollow");
            return;
        }

        button.classList.remove("followed");

        const plus =
            button.querySelector(".plus");

        if (plus) {
            plus.textContent = "+";
        }

        toast(
            `Unfollowed @${creatorUsername}`
        );

    } else {

        // ==============================
        // FOLLOW
        // ==============================

        const { error: insertError } =
            await db
                .from("following")
                .insert({
                    user_id: user.id,
                    following_username:
                        creatorUsername,
                    following_list:
                        creatorUsername
                });

        if (insertError) {
            console.error(
                "Follow error:",
                insertError
            );

            toast("Could not follow");
            return;
        }

        button.classList.add("followed");

        const plus =
            button.querySelector(".plus");

        if (plus) {
            plus.textContent = "✓";
        }

        toast(
            `Following @${creatorUsername}`
        );
    }
}

async function loadRealFollowState(
    creatorId,
    creatorUsername
) {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) return;

    // Own videos don't need a follow button
    if (user.id === creatorId) {

        const buttons =
            document.querySelectorAll(
                `[data-creator-id="${creatorId}"]`
            );

        buttons.forEach(button => {

            const plus =
                button.querySelector(".plus");

            if (plus) {
                plus.style.display = "none";
            }

        });

        return;
    }

    const { data, error } =
        await db
            .from("following")
            .select("following_id")
            .eq("user_id", user.id)
            .eq(
                "following_username",
                creatorUsername
            )
            .maybeSingle();

    if (error) {
        console.error(
            "Follow state error:",
            error
        );
        return;
    }

    const buttons =
        document.querySelectorAll(
            `[data-creator-id="${creatorId}"]`
        );

    buttons.forEach(button => {

        const plus =
            button.querySelector(".plus");

        if (data) {

            button.classList.add("followed");

            if (plus) {
                plus.textContent = "✓";
            }

        } else {

            button.classList.remove("followed");

            if (plus) {
                plus.textContent = "+";
            }
        }
    });
}

// ========================================
// STEP 22 - REAL CREATOR PROFILE
// ========================================

let currentCreatorId = null;
let currentCreatorProfile = null;

async function isUserBlocked(blockedUserId) {

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        return false;
    }

    const {
        data,
        error
    } = await db
        .from("blocked_users")
        .select("block_id")
        .eq("user_id", user.id)
        .eq("blocked_user_id", blockedUserId)
        .maybeSingle();

    if (error) {
        console.error(
            "Block check error:",
            error
        );

        return false;
    }

    return !!data;
}

async function updateCreatorBlockButton() {

    const button =
        document.getElementById("cBlock");

    if (!button || !currentCreatorId) {
        return;
    }

    const blocked =
        await isUserBlocked(currentCreatorId);

    if (blocked) {
        button.textContent = "Unblock";
        button.classList.add("blocked");
    } else {
        button.textContent = "Block";
        button.classList.remove("blocked");
    }
}

async function blockCurrentCreator() {

    if (!currentCreatorId) {
        toast("Creator could not be loaded");
        return;
    }

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        toast("You must be logged in");
        return;
    }

    if (user.id === currentCreatorId) {
        toast("You cannot block yourself");
        return;
    }

    const {
        error
    } = await db
        .from("blocked_users")
        .insert({
            user_id: user.id,
            blocked_user_id: currentCreatorId
        });

    if (error) {
        console.error(
            "Block user error:",
            error
        );

        toast("Could not block user");
        return;
    }

    // REMOVE FOLLOWING RELATIONSHIP
    const { error: unfollowError } = await db
        .from("following")
        .delete()
        .eq("user_id", user.id)
        .eq("following_username", currentCreatorProfile.username);

    if (unfollowError) {
        console.error(
            "Could not remove following relationship:",
            unfollowError
        );
    }

    // REMOVE FOLLOWER RELATIONSHIP
    const { error: followerError } = await db
        .from("follower")
        .delete()
        .eq("user_id", currentCreatorId)
        .eq("follower_id", user.id);

    if (followerError) {
        console.error(
            "Could not remove follower relationship:",
            followerError
        );
    }


    console.log(
        "Blocked user:",
        currentCreatorId
    );

    toast(
        `@${currentCreatorProfile?.username || "user"} blocked`
    );

    await updateCreatorBlockButton();
}

async function toggleBlockCurrentCreator() {

    if (!currentCreatorId) {
        toast("Creator could not be loaded");
        return;
    }

    const blocked =
        await isUserBlocked(currentCreatorId);

    if (blocked) {

        await unblockCurrentCreator();

    } else {

        const username =
            currentCreatorProfile?.username ||
            "this user";

        const confirmed =
            confirm(
                `Block @${username}?\n\n` +
                "You will no longer see their videos."
            );

        if (!confirmed) {
            return;
        }

        await blockCurrentCreator();
    }
}

async function openBlockedAccounts() {

    console.log("Opening blocked accounts");

    go("blockedAccounts");

    await loadBlockedAccounts();
}

async function loadBlockedAccounts() {

    const list =
        document.getElementById("blockedAccountsList");

    if (!list) {
        console.error("blockedAccountsList was not found");
        return;
    }

    list.innerHTML = `
        <div class="blocked-empty">
            Loading blocked accounts...
        </div>
    `;


    // Get logged-in user
    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();


    if (userError || !user) {

        console.error(
            "Blocked accounts auth error:",
            userError
        );

        list.innerHTML = `
            <div class="blocked-empty">
                Please log in first.
            </div>
        `;

        return;
    }


    // Get my blocked users
    const {
        data: blocks,
        error: blockError
    } = await db
        .from("blocked_users")
        .select("blocked_user_id")
        .eq("user_id", user.id);


    if (blockError) {

        console.error(
            "Load blocked accounts error:",
            blockError
        );

        list.innerHTML = `
            <div class="blocked-empty">
                Could not load blocked accounts.
            </div>
        `;

        return;
    }


    console.log(
        "My blocked accounts:",
        blocks
    );


    if (!blocks || blocks.length === 0) {

        list.innerHTML = `
            <div class="blocked-empty">
                You haven't blocked anyone.
            </div>
        `;

        return;
    }


    const blockedIds =
        blocks.map(block => block.blocked_user_id);


    // Get profile information
    const {
        data: profiles,
        error: profileError
    } = await db
        .from("users")
        .select(
            "user_id, firstname, lastname, username, profile_picture"
        )
        .in("user_id", blockedIds);


    if (profileError) {

        console.error(
            "Blocked profile error:",
            profileError
        );

        list.innerHTML = `
            <div class="blocked-empty">
                Could not load blocked profiles.
            </div>
        `;

        return;
    }


    console.log(
        "Blocked profiles:",
        profiles
    );


    displayBlockedAccounts(profiles || []);
}

function displayBlockedAccounts(profiles) {

    const list =
        document.getElementById("blockedAccountsList");


    if (!profiles.length) {

        list.innerHTML = `
            <div class="blocked-empty">
                You haven't blocked anyone.
            </div>
        `;

        return;
    }


    list.innerHTML = profiles.map(profile => {

        const username =
            escapeHTML(profile.username || "user");

        const firstName =
            escapeHTML(profile.firstname || "");

        const lastName =
            escapeHTML(profile.lastname || "");

        const fullName =
            `${firstName} ${lastName}`.trim();


        let avatar;


        if (profile.profile_picture) {

            avatar = `
                <img
                    class="blocked-user-avatar"
                    src="${escapeHTML(profile.profile_picture)}"
                    alt="${username}">
            `;

        } else {

            avatar = `
                <div class="blocked-user-avatar"></div>
            `;

        }


        return `
            <div
                class="blocked-user-row"
                data-blocked-id="${profile.user_id}">

                ${avatar}

                <div class="blocked-user-info">

                    <div class="blocked-user-name">
                        ${fullName || username}
                    </div>

                    <div class="blocked-user-username">
                        @${username}
                    </div>

                </div>


                <button
                    class="unblock-btn"
                    onclick="unblockAccount(
                        '${profile.user_id}',
                        '${username}'
                    )">

                    Unblock

                </button>

            </div>
        `;

    }).join("");
}

async function unblockAccount(
    blockedUserId,
    username
) {

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();


    if (userError || !user) {

        toast("You must be logged in");
        return;

    }


    console.log(
        "Unblocking:",
        blockedUserId
    );


    const {
        error
    } = await db
        .from("blocked_users")
        .delete()
        .eq("user_id", user.id)
        .eq(
            "blocked_user_id",
            blockedUserId
        );


    if (error) {

        console.error(
            "Unblock user error:",
            error
        );

        toast("Could not unblock user");

        return;
    }


    console.log(
        "User unblocked:",
        blockedUserId
    );


    toast(
        `@${username} unblocked`
    );


    // Reload the list
    await loadBlockedAccounts();


    // Refresh Home feed
    await loadRealFeed();
}

async function checkFollowBlock(targetUserId) {
    const { data: { user }, error: authError } =
        await db.auth.getUser();

    if (authError || !user) {
        toast("Please log in first");
        return true;
    }

    if (user.id === targetUserId) {
        return true;
    }

    const { data, error } = await db
        .from("blocked_users")
        .select("user_id, blocked_user_id")
        .or(
            `and(user_id.eq.${user.id},blocked_user_id.eq.${targetUserId}),and(user_id.eq.${targetUserId},blocked_user_id.eq.${user.id})`
        );

    if (error) {
        console.error("Follow block check error:", error);
        toast("Could not verify follow permissions");
        return true;
    }

    if (data && data.length > 0) {
        toast("Following is unavailable because one account has blocked the other");
        return true;
    }

    return false;
}

async function openRealCreator(event, creatorId) {

    event.stopPropagation();

    currentCreatorId = creatorId;

    console.log(
        "Opening creator:",
        creatorId
    );

    const {
        data: creator,
        error
    } = await db
        .from("users")
        .select("user_id,username,firstname,lastname,bio,profile_picture,privacy_status")
        .eq("user_id", creatorId)
        .single();

    if (error) {

        console.error(
            "Creator profile error:",
            error
        );

        toast("Could not load creator");

        return;
    }

    console.log(
        "Creator:",
        creator
    );

    currentCreatorProfile = creator;

    await displayRealCreator(creator);

    await updateCreatorBlockButton();
}

// ========================================
// REPORT CURRENT CREATOR
// ========================================

function reportCurrentCreator() {

    if (!currentCreatorProfile) {
        toast("Creator could not be loaded");
        return;
    }

    openReport({
        username: currentCreatorProfile.username,
        content: "Creator profile"
    });
}

async function getCreatorVideos(creatorId) {

    const {
        data,
        error
    } = await db
        .from("video")
        .select("*")
        .eq("user_id", creatorId)
        .eq("privacy_status", "public")
        .order(
            "upload_date",
            { ascending: false }
        );

    if (error) {

        console.error(
            "Creator videos error:",
            error
        );

        return [];
    }

    return data || [];
}

async function getCreatorFollowerCount(
    creatorUsername
) {

    const {
        count,
        error
    } = await db
        .from("following")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq(
            "following_username",
            creatorUsername
        );

    if (error) {

        console.error(
            "Follower count error:",
            error
        );

        return 0;
    }

    return count || 0;
}

async function getCreatorFollowingCount(creatorId) 
    {

    const {
        count,
        error
    } = await db
        .from("following")
        .select("*", {
            count: "exact",
            head: true
        })
        .eq(
            "user_id",
            creatorId
        );

    if (error) {

        console.error(
            "Following count error:",
            error
        );

        return 0;
    }

    return count || 0;
}

// ========================================
// STEP 22.9 - DISPLAY REAL CREATOR
// ========================================

async function displayRealCreator(creator) {

    const creatorVideos =
        await getCreatorVideos(creator.user_id);

    const followerCount =
        await getCreatorFollowerCount(
            creator.username
        );

    const followingCount =
        await getCreatorFollowingCount(
            creator.user_id
        );

    // Creator title
    document.getElementById("cTitle").textContent =
        creator.username || "Creator";

    // Name
    const fullName =
        `${creator.firstname || ""} ${creator.lastname || ""}`.trim();

    document.getElementById("cName").textContent =
        fullName || creator.username;

    // Username
    document.getElementById("cHandle").textContent =
        `@${creator.username}`;

    // Bio
    document.getElementById("cBio").textContent =
        creator.bio || "";

    // ========================================
    // REAL CREATOR PROFILE PICTURE
    // ========================================

    const creatorAvatar =
        document.getElementById("cAv");

    if (creatorAvatar) {

       if (creator.profile_picture) {

            creatorAvatar.style.backgroundImage =
                `url("${creator.profile_picture}")`;

            creatorAvatar.style.backgroundSize =
                "cover";

            creatorAvatar.style.backgroundPosition =
                "center";

            creatorAvatar.style.backgroundRepeat =
                "no-repeat";

       } else {

            creatorAvatar.style.backgroundImage =
                "none";
        }
    }    

    // Stats
    document.getElementById("cStats").innerHTML = `
        <div>
            <b>${followingCount}</b>
            <span>Following</span>
        </div>

        <div>
            <b>${followerCount}</b>
            <span>Followers</span>
        </div>

        <div>
            <b>${creatorVideos.length}</b>
            <span>Videos</span>
        </div>
    `;

    // Display creator videos
    displayCreatorVideos(creatorVideos);

    // Configure Follow button
    await setupCreatorFollowButton(creator);

    // Open existing creator page
    go("creator");
}
// ========================================
// STEP 22.10 - CREATOR VIDEO GRID
// ========================================

function displayCreatorVideos(videos) { renderVideoGrid('cGrid',videos || []); }

// ========================================
// STEP 22.13 - CREATOR FOLLOW BUTTON
// ========================================

async function setupCreatorFollowButton(creator) {

    const button =
        document.getElementById("cFollow");

    if (!button) return;

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        button.style.display = "none";
        return;
    }

    // Viewing your own profile
    if (user.id === creator.user_id) {

        button.style.display = "none";

        return;
    }

    button.style.display = "";

    const { data: existingFollow, error } =
        await db
            .from("following")
            .select("following_id")
            .eq("user_id", user.id)
            .eq(
                "following_username",
                creator.username
            )
            .maybeSingle();

    if (error) {

        console.error(
            "Creator follow state error:",
            error
        );

        return;
    }

    updateCreatorFollowButton(
        button,
        !!existingFollow
    );

    button.onclick = async function(event) {

        await toggleCreatorFollow(
            event,
            button,
            creator
        );
    };
}
function updateCreatorFollowButton(
    button,
    following
) {

    if (following) {

        button.textContent = "Following";

        button.classList.add("yes");

    } else {

        button.textContent = "Follow";

        button.classList.remove("yes");
    }
}

async function toggleCreatorFollow(
    event,
    button,
    creator
) {

    event.stopPropagation();

    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {
        toast("Please log in first");
        return;
    }

    if (user.id === creator.user_id) {
        return;
    }

    // Check if either user has blocked the other
    const followBlocked = await checkFollowBlock(creator.user_id);

    if (followBlocked) {
        return;
    }

    const { data: existingFollow, error: checkError } =
        await db
            .from("following")
            .select("following_id")
            .eq("user_id", user.id)
            .eq(
                "following_username",
                creator.username
            )
            .maybeSingle();

    if (checkError) {

        console.error(
            "Follow check error:",
            checkError
        );

        return;
    }

    if (existingFollow) {

        // UNFOLLOW

        const { error } =
            await db
                .from("following")
                .delete()
                .eq("user_id", user.id)
                .eq(
                    "following_username",
                    creator.username
                );

        if (error) {

            console.error(
                "Creator unfollow error:",
                error
            );

            toast("Could not unfollow");

            return;
        }

        updateCreatorFollowButton(
            button,
            false
        );

        toast(
            `Unfollowed @${creator.username}`
        );

    } else {

        // FOLLOW

        const { error } =
            await db
                .from("following")
                .insert({
                    user_id: user.id,
                    following_username:
                        creator.username,
                    following_list:
                        creator.username
                });

        if (error) {

            console.error(
                "Creator follow error:",
                error
            );

            toast("Could not follow");

            return;
        }

        updateCreatorFollowButton(
            button,
            true
        );

        toast(
            `Following @${creator.username}`
        );
    }

    // Refresh follower number
    const followerCount =
        await getCreatorFollowerCount(
            creator.username
        );

    const followingCount =
        await getCreatorFollowingCount(
            creator.user_id
        );

    const creatorVideos =
        await getCreatorVideos(
            creator.user_id
        );

    document.getElementById(
        "cStats"
    ).innerHTML = `
        <div>
            <b>${followingCount}</b>
            <span>Following</span>
        </div>

        <div>
            <b>${followerCount}</b>
            <span>Followers</span>
        </div>

        <div>
            <b>${creatorVideos.length}</b>
            <span>Videos</span>
        </div>
    `;
}

// Startup is handled after all UI elements and handlers are initialized.

/* ---------- bottom nav ---------- */
const navItems=[['home','Home',I.home],['discover','Discover',I.compass],['plus','',''],['inbox','Inbox',I.bell],['profile','Profile',I.user]];
document.querySelectorAll('.nav').forEach(nav=>{
  nav.innerHTML = navItems.map(([k,l,ic])=> k==='plus'
    ? `<button onclick="go('create')" aria-label="Create"><span class="plusbtn"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></button>`
    : `<button data-k="${k}" onclick="navTo('${k}')">${ic}<span>${l}</span>${k==='inbox'?'<span class="inbox-badge" data-inbox-badge hidden></span>':''}</button>`
  ).join('');
});
function navTo(k){ go(k); if(k==='profile') loadProfileVideos().catch(error=>toast(error.message)); if(k==='discover') loadDiscover().catch(error=>toast(error.message)); }
function syncNav(){
  document.getElementById('app').classList.toggle('signed-in', !['login','signup'].includes(cur));
  document.querySelectorAll('.desktop-sidebar [data-route]').forEach(button => {
    const selected = button.dataset.route === cur || (['pastLivestreams','liveReplay','blockedAccounts'].includes(cur) && button.dataset.route === 'settings');
    button.classList.toggle('on', selected);
    if(selected) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
  });
  document.querySelectorAll('.nav').forEach(n=>{
    const key = n.dataset.nav;
    n.querySelectorAll('button[data-k]').forEach(b=>b.classList.toggle('on', b.dataset.k===key));
  });
}



// ========================================
// STEP 18 - REAL SUPABASE VIDEO FEED
// ========================================

async function loadRealFeed() {

    const feed = document.getElementById("feed");

    if (!feed) {
        console.error("Feed element not found");
        return;
    }

    console.log("Loading real ViralHub videos...");

    const { data: realVideos, error } = await db
        .from("video")
        .select("*")
        .eq("privacy_status", "public")
        .order("upload_date", {
            ascending: false
        });

    if (error) {
        console.error("Feed loading error:", error);
        toast("Could not load videos");
        return;
    }

    
    
    // ========================================
    // FILTER VIDEOS FROM BLOCKED USERS
    // ========================================

    const {
        data: { user: currentUser }
    } = await db.auth.getUser();

    let blockedUserIds = [];

    if (currentUser) {
        const {
            data: blockedUsers,
            error: blockedError
        } = await db
            .from("blocked_users")
            .select("blocked_user_id")
            .eq("user_id", currentUser.id);

        if (blockedError) {
            console.error(
                "Could not load blocked users:",
                blockedError
            );
        } else {
            blockedUserIds = (blockedUsers || []).map(
                block => block.blocked_user_id
            );
        }
    }

    let followedIds = null;
    const tab = document.querySelector('#feedtabs button.on')?.dataset.tab;
    if (tab === 'friends' && currentUser) {
        const {data: following, error: followingError} = await db.from('following').select('following_username').eq('user_id',currentUser.id);
        const {data: followers, error: followersError} = await db.from('following').select('user_id').eq('following_username',(await getCurrentProfile())?.username || '');
        if (followingError || followersError) return toast('Could not load friends feed');
        const names = (following || []).map(row => row.following_username);
        const {data: people, error: peopleError} = names.length ? await db.from('users').select('user_id').in('username',names) : {data:[]};
        if (peopleError) return toast('Could not load friends');
        const followerIds = new Set((followers || []).map(row=>row.user_id));
        followedIds = new Set((people || []).filter(row=>followerIds.has(row.user_id)).map(row=>row.user_id));
    }
    const visibleVideos = (realVideos || []).filter(video => !followedIds || followedIds.has(video.user_id)).filter(
        video => !blockedUserIds.includes(video.user_id)
    );

    console.log("Blocked users:", blockedUserIds);
    console.log("Visible videos:", visibleVideos);

    console.log("Real videos:", realVideos);

    // No uploaded videos yet
    stopFeedPlayback();
    if (visibleVideos.length === 0) {

        feed.innerHTML = `
            <div class="emptyfeed" style="display:flex">
                <h4>No videos yet</h4>
                <p>Upload the first video on ViralHub.</p>
            </div>
        `;

        return;
    }

    await Social.prepareSoundLabels(visibleVideos);
    // Create real video cards
    feed.innerHTML = visibleVideos.map((video, index) => {

        const username =
            escapeHTML(video.username || "ViralHub User");

        const caption =
            escapeHTML(video.caption || "");

        const videoUrl =
            escapeHTML(video.video_url || "");

        const views =
            Number(video.viewcount || 0);

        return `
            <article
                class="vid"
                data-video-id="${video.video_id}"
                data-i="${index}">

                <div class="video-stage">
                <video
                    class="real-video"
                    src="${videoUrl}"
                    muted loop
                    playsinline
                    preload="metadata">
                </video>

                <div class="shade"></div>

                <button class="video-toggle" onclick="toggleFeedVideo(this)" aria-label="Pause video"><span aria-hidden="true">▶</span></button>
                <button class="video-sound" onclick="toggleFeedSound(this)" aria-label="Turn sound on" aria-pressed="false">${I.note}<span>Sound off</span></button>
                <div class="video-progress" aria-hidden="true"><span></span></div>

                <div class="meta">

                    <h3
                        onclick="openRealCreator(event, '${video.user_id}')"
                        style="cursor:pointer;">
                        @${username}
                    </h3>

                    <p>
                        ${caption}
                    </p>

                    <button class="sound sound-link" onclick="Social.openSound('${video.video_id}')" aria-label="Open original sound">
                        ${I.note}
                        <span>
                            Original sound - ${escapeHTML(Social.soundLabel(video))}
                        </span>
                    </button>

                    <small>
                        <span data-views-for="${video.video_id}">${nf(views)} views</span>
                    </small>

                </div>

                </div>
                <div class="rail">

                    <button
                        class="railav"
                        data-creator-id="${video.user_id}"
                        onclick="toggleRealFollow(
                            event,
                            this,
                            '${video.user_id}',
                             '${escapeHTML(String(video.username || '').replace(/[^A-Za-z0-9_]/g, ''))}'
                         )"
                        aria-label="Follow ${username}">

                        <div
                            class="av"
                            onclick="openRealCreator(event, '${video.user_id}')">
                        </div>

                        <span class="plus">+</span>

                    </button>

                    <button
                        class="act heart"
                        onclick="toggleRealLike(event, this, '${video.video_id}')"
                        aria-label="Like">

                        ${I.heart}

                        <span data-likes>0</span>
                    </button>

                   <button
                        class="act"
                        onclick="openRealComments(event, '${video.video_id}')"
                        aria-label="Comments">

                        ${I.cmt}

                        <span data-comments>0</span>

                    </button>

                    <button
                        class="act"
                        onclick="event.stopPropagation(); shareRealVideo('${videoUrl}')"
                        aria-label="Share">

                        ${I.share}

                        <span>Share</span>

                    </button>

                    <span class="disc">
                        ${I.note}
                    </span>

                </div>

            </article>
        `;

    }).join("");

    setupRealVideoPlayback();

    for (const video of visibleVideos) {

    await updateRealLikeCount(
        video.video_id
    );

    await loadMyLikeState(
        video.video_id
    );

    await updateRealCommentCount(
        video.video_id
    );

    await loadRealFollowState(
    video.user_id,
    video.username
);
}   
}

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

let activeFeedVideo = null;
let feedMuted = true;
function updateFeedControls(video) {
    const card = video.closest('.vid');
    const play = card.querySelector('.video-toggle');
    const sound = card.querySelector('.video-sound');
    if(play) { play.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video'); card.classList.toggle('video-paused',video.paused); }
    if(sound) { sound.setAttribute('aria-label', video.muted ? 'Turn sound on' : 'Mute sound'); sound.setAttribute('aria-pressed',String(!video.muted)); sound.querySelector('span').textContent=video.muted ? 'Sound off' : 'Sound on'; }
}
function toggleFeedVideo(button) {
    const video = button.closest('.vid').querySelector('.real-video');
    if (!feedCanPlay()) return;
    if (video.paused) video.play().catch(() => toast('Could not play this video.')); else video.pause();
}
function toggleFeedSound(button) {
    const video = button.closest('.vid').querySelector('.real-video');
    feedMuted = !video.muted;
    document.querySelectorAll('#feed .real-video').forEach(item => { item.muted=feedMuted; updateFeedControls(item); });
    if(video.paused && feedCanPlay()) video.play().catch(() => toast('Tap the video to play.'));
}

function feedCanPlay() {
    return cur === 'home' && !document.hidden &&
        document.querySelector('#feedtabs button.on')?.dataset.tab !== 'live' &&
        document.getElementById('feed').style.display !== 'none';
}
function stopFeedPlayback() {
    activeFeedVideo = null;
    document.querySelectorAll('#feed .real-video').forEach(video => video.pause());
}
function syncFeedPlayback() {
    if (!feedCanPlay()) { stopFeedPlayback(); return; }
    const feed = document.getElementById('feed');
    const bounds = feed.getBoundingClientRect();
    let selected = null, largest = 0;
    feed.querySelectorAll('.real-video').forEach(video => {
        const rect = video.closest('.vid').getBoundingClientRect();
        const visible = Math.max(0, Math.min(rect.bottom, bounds.bottom) - Math.max(rect.top, bounds.top));
        if (visible > largest && visible > rect.height / 2) { selected = video; largest = visible; }
    });
    if (selected === activeFeedVideo) return;
    stopFeedPlayback();
    if (!selected) return;
    activeFeedVideo = selected;
    if(typeof Social !== 'undefined') Social.onFeedVideo(selected);
    const playing = selected.play();
    if (playing) playing.then(() => {
        // A pending play must not restart audio after navigation or a swipe.
        if (!feedCanPlay() || activeFeedVideo !== selected) selected.pause();
    }).catch(() => {
        // Browsers can block audible playback; retry muted and keep a tap-to-play fallback.
        if(feedCanPlay() && activeFeedVideo === selected && !selected.muted) {
            selected.muted=true; feedMuted=true; updateFeedControls(selected);
            selected.play().catch(() => updateFeedControls(selected));
        } else updateFeedControls(selected);
    });
}
function setupRealVideoPlayback() {
    document.querySelectorAll('#feed .real-video').forEach(video => {
        video.loop = true;
        video.muted = feedMuted;
        video.playsInline = true;
        ['play','pause','volumechange','loadedmetadata'].forEach(name => video.addEventListener(name, () => updateFeedControls(video)));
        ['play','pause','seeking'].forEach(name=>video.addEventListener(name,()=>Alerts.resetWatchPosition(video)));
        video.addEventListener('timeupdate', () => {
            Alerts.track(video);
            const bar=video.closest('.vid').querySelector('.video-progress span');
            if(bar) bar.style.width=(Number.isFinite(video.duration) && video.duration > 0 ? video.currentTime/video.duration*100 : 0)+'%';
        });
        updateFeedControls(video);
        video.addEventListener('play', () => {
            if (!feedCanPlay()) { video.pause(); return; }
            document.querySelectorAll('#feed .real-video').forEach(other => {
                if (other !== video) other.pause();
            });
            activeFeedVideo = video;
        });
    });
    requestAnimationFrame(syncFeedPlayback);
}
let feedPlaybackFrame = 0;
function scheduleFeedPlayback() {
    cancelAnimationFrame(feedPlaybackFrame);
    feedPlaybackFrame = requestAnimationFrame(syncFeedPlayback);
}
document.getElementById('feed').addEventListener('scroll', scheduleFeedPlayback, { passive: true });
window.addEventListener('resize', scheduleFeedPlayback);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopFeedPlayback(); else scheduleFeedPlayback();
});

async function shareRealVideo(videoUrl) {

    try {

        if (navigator.share) {

            await navigator.share({
                title: "ViralHub Video",
                url: videoUrl
            });

        } else {

            await navigator.clipboard.writeText(
                videoUrl
            );

            toast("Video link copied");

        }

    } catch (error) {

        console.log(
            "Share cancelled:",
            error
        );
    }
}



/* feed tabs */
const ftabs=document.getElementById('feedtabs');
function layoutInk(){
  const on=ftabs.querySelector('button.on'), ink=document.getElementById('tabink');
  ink.style.left=on.offsetLeft+'px'; ink.style.width=on.offsetWidth+'px';
}
ftabs.querySelectorAll('button').forEach(b=>b.onclick=()=>{
  closeSheets();
  ftabs.querySelectorAll('button').forEach(x=>x.classList.remove('on'));
  b.classList.add('on'); layoutInk();
  const t=b.dataset.tab;
  stopFeedPlayback();
  document.getElementById('emptyFriends').classList.remove('show');
  document.getElementById('emptyLive').classList.toggle('show',t==='live');
  document.getElementById('feed').style.display = t === 'live' ? 'none' : '';
  if (t !== 'live') loadRealFeed();
  if(typeof Live !== 'undefined') Live.showDirectory(t==='live');
});

/* Discover loads real profiles and videos through loadDiscover(). */

/* ---------- create ---------- */
const cats=['Entertainment','Music','Dance','Food','Travel','Tech','Sports','Lifestyle'];

document.getElementById('cats').innerHTML = 
    cats.map((c,i)=>`<button class="cat${i?'':' on'}" onclick="pickCat(this)">${c}</button>`).join('');

function pickCat(el){
  document.querySelectorAll('#cats .cat').forEach(c=>c.classList.remove('on')); 
  el.classList.add('on'); 
}
function setSeg(n){
  const segs=document.getElementById('segs').querySelectorAll('button');
  segs.forEach((b,i)=>b.classList.toggle('on',i===n));
  document.getElementById('seg0').style.display=n?'none':'';
  document.getElementById('seg1').style.display=n?'':'none';
  const ink=document.getElementById('segink'), b=segs[n];
  ink.style.left=b.offsetLeft+'px'; 
  ink.style.width=b.offsetWidth+'px';
}

/* ---------- profile ---------- */
['ptab0','ptab1'].forEach(id => document.getElementById(id).innerHTML = emptyMessage('No videos yet.'));

function setPTab(n){
  if(n===2) { navTo('inbox'); return; }
  loadProfileVideos().catch(error=>console.error(error));
  const tabs=document.getElementById('ptabs').querySelectorAll('button');
  tabs.forEach((b,i)=>b.classList.toggle('on',i===n));
  [0,1].forEach(i=>document.getElementById('ptab'+i).style.display = i===n?'grid':'none');
  const ink=document.getElementById('ptabink'), b=tabs[n];
  ink.style.left=b.offsetLeft+'px'; ink.style.width=b.offsetWidth+'px';
}

/* ---------- creator page ---------- */


function openCreator(k) {
    const creator = users[k];
    if (creator) return openRealCreator({stopPropagation(){}}, creator.user_id);
}

// ========================================
// STEP 23 - REPORT SYSTEM
// ========================================

let currentReportUser = null;
let currentReportVideoId = null;
let currentReportContent = null;
let selectedReportReason = null;


// ========================================
// OPEN REPORT SHEET
// ========================================

function openReport({
    username = null,
    videoId = null,
    content = null
} = {}) {

    console.log("Opening report for:", username);

    currentReportUser = username;
    currentReportVideoId = videoId;
    currentReportContent = content;
    selectedReportReason = null;

    // Clear previous details
    const details =
        document.getElementById("reportDetails");

    if (details) {
        details.value = "";
    }

    // Remove previous selected reason
    document
        .querySelectorAll(".report-options button")
        .forEach(button => {
            button.classList.remove("selected");
        });

    // Change report title/message
    const target =
        document.getElementById("reportTargetText");

    if (target) {

        if (username) {
            target.textContent =
                `Why are you reporting @${username}?`;
        } else {
            target.textContent =
                "Why are you reporting this content?";
        }
    }

    // Open report sheet
    openSheet("report");
}

// ========================================
// SELECT REPORT REASON
// ========================================

function selectReportReason(button, reason) {

    // Save selected reason
    selectedReportReason = reason;

    // Remove selection from all buttons
    document
        .querySelectorAll(".report-options button")
        .forEach(btn => {
            btn.classList.remove("selected");
        });

    // Highlight clicked button
    button.classList.add("selected");

    console.log(
        "Selected report reason:",
        selectedReportReason
    );
}

// ========================================
// SUBMIT REPORT TO SUPABASE
// ========================================

async function submitReport() {

    console.log("Submitting report...");

    // Make sure a reason was selected
    if (!selectedReportReason) {
        toast("Please select a reason");
        return;
    }

    // Get logged-in user
    const {
        data: { user },
        error: userError
    } = await db.auth.getUser();

    if (userError || !user) {

        console.error(
            "Report user error:",
            userError
        );

        toast("You must be logged in");
        return;
    }

    // Get optional details typed by user
    const detailsInput =
        document.getElementById("reportDetails");

    const details =
        detailsInput
            ? detailsInput.value.trim()
            : "";

    console.log("Report data:", {
        reportedUser: currentReportUser,
        reason: selectedReportReason,
        details: details,
        videoId: currentReportVideoId
    });

    // Insert report into Supabase
    const {
        data,
        error
    } = await db
        .from("report")
        .insert({
            user_id: user.id,

            reported_user:
                currentReportUser || "Unknown",

            reported_content:
                details ||
                currentReportContent ||
                "Reported content",

            reason:
                selectedReportReason,

            reportedvideo_id:
                currentReportVideoId || null
        })
        .select();

    if (error) {

        console.error(
            "Report database error:",
            error
        );

        toast("Could not submit report");
        return;
    }

    console.log(
        "Report successfully saved:",
        data
    );

    toast("Report submitted successfully");

    // Close report sheet
    closeSheets();

    // Reset report information
    currentReportUser = null;
    currentReportVideoId = null;
    currentReportContent = null;
    selectedReportReason = null;

    if (detailsInput) {
        detailsInput.value = "";
    }
}


// ========================================
// REPORT CURRENT CREATOR
// ========================================

function reportCurrentCreator() {

    console.log("REPORT BUTTON CLICKED");

    console.log(
        "Current creator:",
        currentCreatorProfile
    );

    if (!currentCreatorProfile) {
        toast("Creator could not be loaded");
        return;
    }

    openReport({
        username: currentCreatorProfile.username,
        content: "Creator profile"
    });
}

function toggleFollowBtn(b){
  const on=b.textContent.trim()==='Following';
  b.textContent = on?'Follow':'Following';
  b.className = 'follow '+(on?'no':'yes');
  toast(on?'Unfollowed':'Following');
}

/* ---------- sheets ---------- */
function renderComments(){
  document.getElementById('cmtCount').textContent = comments.length+(comments.length===1?' comment':' comments');
  document.getElementById('cmtList').innerHTML = comments.map(c=>
    `<div class="cmt">${av(c.u)||''}<div class="bd"><b>${c.u}</b><p>${c.t}</p><small>${c.ago} · ${c.likes} likes</small></div></div>`
  ).join('');
}
async function sendComment() { return Social.sendComment(); }
function openSheet(name){
  closeSheets();
  const sheet=document.getElementById('sheet-'+name);
  if(!sheet) return;
  if(name==='comments') document.getElementById('app').classList.add('comments-open');
  else document.getElementById('scrim').classList.add('show');
  sheet.classList.add('show');
  scheduleFeedPlayback();
}
function closeSheets(){
  document.getElementById('scrim').classList.remove('show');
  document.getElementById('app').classList.remove('comments-open');
  document.querySelectorAll('.sheet').forEach(s=>s.classList.remove('show'));
  if(typeof scheduleFeedPlayback==='function') scheduleFeedPlayback();
}

/* ---------- misc ---------- */
let tt;
function toast(msg){
  const el=document.getElementById('toast'); el.textContent=msg; el.classList.add('show');
  clearTimeout(tt); tt=setTimeout(()=>el.classList.remove('show'),1900);
}
document.querySelectorAll('.eye').forEach(b=>b.onclick=()=>{
  const i=document.getElementById(b.dataset.eye);
  i.type = i.type==='password'?'text':'password';
  b.style.color = i.type==='text'?'var(--pink)':'';
});
function setTheme(t){
  document.documentElement.dataset.theme=t;
  document.getElementById('sw').classList.toggle('on',t==='dark');
  document.getElementById('thDark').classList.toggle('on',t==='dark');
  document.getElementById('thLight').classList.toggle('on',t!=='dark');
  try{ localStorage.setItem('vh-theme',t); }catch(e){}
}
function toggleTheme(){ setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'); }
try{ const s=localStorage.getItem('vh-theme'); if(s) setTheme(s); }catch(e){}

/* date selects */
const mm=document.getElementById('mm'),dd=document.getElementById('dd'),yy=document.getElementById('yy');
['January','February','March','April','May','June','July','August','September','October','November','December']
  .forEach((m,i)=>mm.add(new Option(m,i+1)));
for(let d=1;d<=31;d++) dd.add(new Option(d,d));
for(let y=new Date().getFullYear();y>=1940;y--) yy.add(new Option(y,y));

/* init positions */
window.addEventListener('load',()=>{ layoutInk(); setSeg(0); setPTab(0); });
window.addEventListener('resize',()=>{ layoutInk(); });
syncNav();
/* Database-backed discovery, profile grids, and account initialization. */
let signupBusy = false;
let refreshInFlight = null;
const publicProfileColumns = 'user_id,username,firstname,lastname,bio,profile_picture,privacy_status';
function emptyMessage(message) {
    return `<p style="padding:24px;grid-column:1/-1;color:var(--text-dim)">${escapeHTML(message)}</p>`;
}
async function ensureOwnProfile() {
    const {data:{user},error:authError} = await db.auth.getUser();
    if (authError || !user) throw authError || new Error('Please log in');
    const {data:profile,error} = await db.from('users').select('*').eq('user_id',user.id).maybeSingle();
    if (error) throw error;
    if (profile) {
        // Auth is the source of truth after a confirmed email change.
        if (profile.email !== user.email) {
            const {error:syncError} = await db.from('users').update({email:user.email}).eq('user_id',user.id);
            if (syncError) throw syncError;
        }
        return profile;
    }
    const metadata = user.user_metadata || {};
    if (!metadata.username) throw new Error('Your account has no profile. Contact the project owner.');
    const {error:insertError} = await db.from('users').insert({
        user_id:user.id,firstname:metadata.firstname || '',lastname:metadata.lastname || '',
        username:metadata.username,email:user.email,password:'managed_by_supabase_auth',
        birthdate:metadata.birthdate || null,privacy_status:'public'
    });
    if (insertError && insertError.code !== '23505') throw insertError;
    const {data:created,error:readError} = await db.from('users').select('user_id').eq('user_id',user.id).single();
    if (readError || !created) throw new Error('Could not create your profile. Your username may already be taken.');
}
async function refreshSignedInApp() {
    if (refreshInFlight) return refreshInFlight;
    refreshInFlight = (async()=>{
        await ensureOwnProfile();
        await loadUserProfile();
        await Promise.all([loadRealFeed(),loadDiscover(),loadProfileVideos()]);
        if (cur === 'login' || cur === 'signup') go('home');
        await Alerts.start();
    })();
    try { await refreshInFlight; }
    finally { refreshInFlight = null; }
}
function renderCreators(list) {
    const box = document.getElementById('creatorlist');
    box.replaceChildren();
    for (const key of list) {
        const profile = users[key];
        const button = document.createElement('button');
        button.className = 'row'; button.style.width = '100%'; button.style.textAlign = 'left';
        button.innerHTML = `<div class="av"></div><span class="txt"><span class="nm">${escapeHTML([profile.firstname,profile.lastname].filter(Boolean).join(' ') || profile.username)}</span><span class="sub">@${escapeHTML(profile.username)} · ${escapeHTML(profile.bio || '')}</span></span>`;
        const avatar = button.querySelector('.av');
        if (profile.profile_picture) avatar.style.backgroundImage = `url(${JSON.stringify(profile.profile_picture)})`;
        button.onclick = event => openRealCreator(event,profile.user_id);
        box.appendChild(button);
    }
    if (!list.length) box.innerHTML = emptyMessage('No creators match that search.');
}
function filterCreators(query) {
    const q = query.toLowerCase().trim();
    renderCreators(Object.keys(users).filter(key=>[key,users[key].firstname,users[key].lastname].some(value=>(value || '').toLowerCase().includes(q))));
}
async function loadDiscover() {
    const [{data:people,error},{data:items,error:videoError}] = await Promise.all([
        db.from('users').select(publicProfileColumns).order('registration_date',{ascending:false}),
        db.from('video').select('video_id,user_id,username,caption,video_url,upload_date,viewcount').eq('privacy_status','public').order('upload_date',{ascending:false}).limit(12)
    ]);
    if (error || videoError) {
        document.getElementById('creatorlist').innerHTML=emptyMessage('Could not load creators. Try again.');
        document.getElementById('trendgrid').innerHTML=emptyMessage('Could not load videos.');
        console.error(error || videoError); return;
    }
    const {data:{user}}=await db.auth.getUser();
    let blocked = new Set();
    if (user) {
        const {data:blocks,error:blockError}=await db.from('blocked_users').select('blocked_user_id').eq('user_id',user.id);
        if (blockError) throw blockError;
        blocked=new Set((blocks || []).map(row=>row.blocked_user_id));
    }
    Object.keys(users).forEach(key=>delete users[key]);
    (people || []).filter(profile=>!blocked.has(profile.user_id)).forEach(profile=>{users[profile.username]=profile;});
    renderCreators(Object.keys(users));
    const visible=(items || []).filter(video=>!blocked.has(video.user_id));
    renderVideoGrid('trendgrid',visible);
    const tags = [...new Set(visible.flatMap(video=>(video.caption || '').match(/#[\p{L}\p{N}_]+/gu) || []))];
    const tagbox=document.getElementById('tagbox'); tagbox.replaceChildren();
    for(const tag of tags) {
        const button=document.createElement('button'); button.className='tag-pill'; button.textContent=tag;
        button.onclick=()=>renderVideoGrid('trendgrid',visible.filter(video=>(video.caption || '').includes(tag)));
        tagbox.appendChild(button);
    }
    if(!tags.length) tagbox.innerHTML=emptyMessage('No hashtags in uploaded videos yet.');
}
function renderVideoGrid(id,items) {
    const grid=document.getElementById(id); grid.replaceChildren();
    if(!items.length) {grid.innerHTML=emptyMessage('No videos yet.'); return;}
    for(const item of items) {
        const button=document.createElement('button'); button.className='thumb'; button.type='button';
        const video=document.createElement('video'); video.src=item.video_url || ''; video.muted=true; video.preload='metadata'; video.playsInline=true;
        const label=document.createElement('span'); label.className='lbl'; label.textContent='@'+(item.username || 'Creator');
        const views=document.createElement('span');views.className='video-viewcount';views.dataset.viewsFor=item.video_id;views.textContent='▷ '+nf(Number(item.viewcount)||0);views.setAttribute('aria-label',(Number(item.viewcount)||0)+' views');
        button.append(video,label,views);
        button.onclick=event=>{
            event.stopPropagation();
            Alerts.openVideo(item.video_id).catch(error=>toast(error.message));
        };
        grid.appendChild(button);
    }
}
async function loadProfileVideos() {
    const profile=await getCurrentProfile(); if(!profile) return;
    const [{data:posts,error:postError},{data:liked,error:likedError}] = await Promise.all([
        db.from('video').select('video_id,username,video_url,viewcount').eq('user_id',profile.user_id).neq('privacy_status','deleted').order('upload_date',{ascending:false}),
        db.from('like').select('video_id').eq('user_id',profile.user_id)
    ]);
    renderVideoGrid('ptab0',posts || []);
    if(postError) document.getElementById('ptab0').innerHTML=emptyMessage('Could not load your videos.');
    const ids=(liked || []).map(row=>row.video_id);
    const {data:likedVideos,error:videoError}=ids.length ? await db.from('video').select('video_id,username,video_url,viewcount').in('video_id',ids) : {data:[]};
    renderVideoGrid('ptab1',likedVideos || []);
    if(likedError || videoError) document.getElementById('ptab1').innerHTML=emptyMessage('Could not load liked videos.');
    const friends=await loadSocialProfiles(profile,'friends');
    document.getElementById('profileFriendsCount').textContent=friends.length;
}
async function loadSocialProfiles(profile,kind) {
    const [{data:following,error:e1},{data:followers,error:e2}]=await Promise.all([
        db.from('following').select('following_username').eq('user_id',profile.user_id),
        db.from('following').select('user_id').eq('following_username',profile.username)
    ]);
    if(e1 || e2) throw e1 || e2;
    const names=(following || []).map(row=>row.following_username);
    const ids=(followers || []).map(row=>row.user_id);
    if(kind==='following') {
        if(!names.length) return [];
        const {data,error}=await db.from('users').select(publicProfileColumns).in('username',names);
        if(error) throw error; return data || [];
    }
    if(!ids.length) return [];
    const {data,error}=await db.from('users').select(publicProfileColumns).in('user_id',ids);
    if(error) throw error;
    return kind==='friends' ? (data || []).filter(person=>names.includes(person.username)) : data || [];
}
async function openList(kind) {
    document.getElementById('listTitle').textContent=kind[0].toUpperCase()+kind.slice(1);
    const box=document.getElementById('listBody'); box.innerHTML=emptyMessage('Loading...'); openSheet('list');
    try {
        const profile=await getCurrentProfile(); if(!profile) throw new Error('Please log in');
        const people=await loadSocialProfiles(profile,kind); box.replaceChildren();
        for(const person of people) {
            const button=document.createElement('button'); button.className='row'; button.textContent='@'+person.username;
            button.onclick=event=>{closeSheets();openRealCreator(event,person.user_id);}; box.appendChild(button);
        }
        if(!people.length) box.innerHTML=emptyMessage('No '+kind+' yet.');
    } catch(error) {console.error(error);box.innerHTML=emptyMessage('Could not load this list.');}
}
// Callback defers Supabase calls until the Auth callback has returned.
db.auth.onAuthStateChange((event,session)=>{
    if(event==='SIGNED_OUT') {
        Alerts.stop();
        if(typeof Live !== 'undefined') Live.signedOut();
        document.querySelectorAll('video').forEach(video=>video.pause());
        Object.keys(users).forEach(key=>delete users[key]);
        ['ptab0','ptab1','creatorlist','trendgrid','feed'].forEach(id=>document.getElementById(id).replaceChildren());
        ['profileUsername','profileFullName','profileBio','settingsFullName','settingsHandle'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='';});
        document.querySelectorAll('#settings input, #settings textarea').forEach(input=>{input.value='';});
        ['profileAvatar','settingsProfilePicture'].forEach(id=>{const el=document.getElementById(id);if(el){el.style.backgroundImage='none';if(el.tagName==='IMG')el.removeAttribute('src');}});
        currentCreatorId=null; currentCreatorProfile=null;
        closeSheets();
        go('login');
    } else if(session && ['SIGNED_IN','USER_UPDATED'].includes(event)) {
        setTimeout(()=>refreshSignedInApp().catch(error=>{console.error(error);toast(error.message || 'Could not load account');}),0);
    }
});
checkSession().catch(error=>{console.error(error);toast(error.message || 'Could not initialize account');});
