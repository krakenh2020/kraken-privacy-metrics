import binomial from 'binomial';

/*
 * Enumeration for preparing data for the frontend
 *
 * privacy value, color code in hex, precentage of the bar, privacy value in words
 */
class FrontendStyle {
    constructor(priv_val, bgcolor, completed, text) {
        this.priv_val = priv_val;
        this.bgcolor = bgcolor;
        this.completed = completed;
        this.text = text;
    }

    static VERY_LOW_PRIVACY = new FrontendStyle(1, "#fc0000", 16.7, "Very Low");
    static LOW_PRIVACY = new FrontendStyle(2, "#fc5c00", 33.3, "Low");
    static MODERATELY_LOW_PRIVACY = new FrontendStyle(3, "#fcce00", 50, "Moderately Low");
    static MODERATELY_HIGH_PRIVACY = new FrontendStyle(4, "#b3b888", 66.7, "Moderately High");
    static HIGH_PRIVACY = new FrontendStyle(5, "#c1fc00", 83.3, "High");
    static VERY_HIGH_PRIVACY = new FrontendStyle(6, "#11fc00", 100, "Very High");

    static values() {
        return [FrontendStyle.VERY_LOW_PRIVACY, FrontendStyle.LOW_PRIVACY, FrontendStyle.MODERATELY_LOW_PRIVACY, FrontendStyle.MODERATELY_HIGH_PRIVACY, FrontendStyle.VERY_HIGH_PRIVACY];
    }
}

export function score_to_style(score) {
    if (score > 5.5) {
        return FrontendStyle.VERY_HIGH_PRIVACY;
    }
    if (score > 4.5) {
        return FrontendStyle.HIGH_PRIVACY;
    }
    if (score > 3.5) {
        return FrontendStyle.MODERATELY_HIGH_PRIVACY;
    }
    if (score > 2.5) {
        return FrontendStyle.MODERATELY_LOW_PRIVACY;
    }
    if (score > 1.5) {
        return FrontendStyle.LOW_PRIVACY;
    }
    return FrontendStyle.VERY_LOW_PRIVACY;
}

export function scale_grade(value) {
    if (value >= 84) {
        return 1;
    }
    if (value >= 68) {
        return 2;
    }
    if (value >= 52) {
        return 3;
    }
    if (value >= 40) {
        return 4;
    }
    if (value >= 24) {
        return 5;
    }
    return 6;
}

function get_scale_asc(q) {
    if (q <= 1) {
        return 0.8;
    }
    if (q <= 2) {
        return 0.9;
    }
    if (q <= 3) {
        return 1;
    }
    if (q <= 4) {
        return 1.1;
    }
    if (q <= 5) {
        return 1.2;
    }
    return 1;
}

function get_scale_desc(q) {
    if (q <= 1) {
        return 1.2;
    }
    if (q <= 2) {
        return 1.1;
    }
    if (q <= 3) {
        return 1;
    }
    if (q <= 4) {
        return 0.9;
    }
    if (q <= 5) {
        return 0.8;
    }
    return 1;
}

export function adv_strength_min(score) {
    if (score < 0 || score > 6) {
        console.error("Must be in range [0, 6]");
    }
    let min = 0.0;
    for (const value of FrontendStyle.values()) {
        if (score <= value.priv_val) {
            return (min / 100);
        }
        min = value.completed;
    }
}

export function adv_strength_max(score) {
    if (score < 0 || score > 6) {
        console.error("Must be in range [0, 6]");
    }
    for (const value of FrontendStyle.values()) {
        if (score <= value.priv_val) {
            return (value.completed / 100);
        }
    }
}

function binomialCoefficient(n, k) {
    // Checking if n and k are integer
    if (Number.isNaN(n) || Number.isNaN(k)) {
        return NaN;
    }

    return binomial.get(n, k);
}

export function metric1_calculator(num_files, adv_strength_min, adv_strenght_max) {
    // paper page 21
    if (num_files === 0) { // this solves the edge case resp. bug described in the README
        num_files = 1;
    }
    if (num_files < 0) {
        console.error("Number of files is negative");
    }
    if (adv_strenght_max < 0 || adv_strenght_max > 1 || adv_strength_min < 0 || adv_strength_min > 1) {
        console.error("adversary strength values must be in range [0, 1]");
    }
    if (adv_strenght_max < adv_strength_min) {
        console.error("adversary strength max < adversary strength min");
    }

    let val1 = num_files - (num_files * adv_strength_min);
    let val2 = num_files - (num_files * adv_strenght_max);
    let file_access = num_files - ((val1 + val2) / 2.0);
    return Math.round((file_access / num_files) * 100);
}

export function metric2_calculator(num_files, sim_files, privacy_val) {
    // paper page 22
    if (sim_files > num_files) {
        num_files = sim_files + 1;
    }
    if (num_files < 0 || sim_files < 0) {
        console.error("All inputs must be non-negative integers");
    }
    if (privacy_val < 0 || privacy_val > 100) {
        console.error("privacy_val must be in range 0 and 100");
    }
    let file_access = Math.round(num_files * (privacy_val / 100.0));
    // must be calculated in double, but file_access should be an integer, otherwise file_access could be 0
    if (file_access < 2) {
        // adversary cannot get two similar files if they are not able to get at least two files. Thus if file_access < 2: return very high privacy.
        return 0;
    }
    let temp_files = num_files - sim_files;
    let total = 0;

    for (let i = 2; i < sim_files + 1; i++) {
        let temp_access = file_access - i;
        if (num_files - sim_files < temp_access) {
            i = privacy_val - (num_files - sim_files);
            total += binomialCoefficient(sim_files, i);
            continue;
        }
        total += binomialCoefficient(sim_files, i) * binomialCoefficient(temp_files, temp_access);
    }
    let dividend = binomialCoefficient(num_files, file_access);
    return Math.round(total / dividend * 100);
}

function adversary(input) {
    /*
     * input default handler, if user doesn't select anything then a default value
     * gets assigned
     */
    let AdvStrength2 = 0;
    if (input.advStrength == null || input.advStrength === '' || input.advStrength === 0) {
        input.advStrength = 3;
    }
    if (input.advStrength1 == null || input.advStrength1 === '' || input.advStrength1 === 0) {
        input.advStrength1 = 3;
    }
    if (input.advStrength2.length > 0) {
        AdvStrength2 = Math.max(...input.advStrength2);
    }
    if (input.advStrength3 == null || input.advStrength3 === '' || input.advStrength3 === 0) {
        input.advStrength3 = 3;
    }
    if (input.advStrength4 == null || input.advStrength4 === '' || input.advStrength4 === 0) {
        input.advStrength4 = 3;
    }
    if (input.advStrength5 == null || input.advStrength5 === '' || input.advStrength5 === 0) {
        input.advStrength5 = 3;
    }

    if (input.q1 == null || input.q1 === '' || input.q1 === 0) {
        input.q1 = 3;
    }
    if (input.q2 == null || input.q2 === '' || input.q2 === 0) {
        input.q2 = 3;
    }
    if (input.q3 == null || input.q3 === '' || input.q3 === 0) {
        input.q3 = 3;
    }
    if (input.q4 == null || input.q4 === '' || input.q4 === 0) {
        input.q4 = 3;
    }

    /* strength is dependent on 6 questions */
    let strength = input.advStrength + input.advStrength + AdvStrength2 + input.advStrength3 + input.advStrength + input.advStrength5;
    strength /= 6;

    /* based on slide bar question Q1 we scale the strength */
    strength *= get_scale_asc(input.q1);

    /* edge cases: because of scaling they might get out of range */
    strength = Math.max(1, strength);
    strength = Math.min(6, strength);

    /* calculate min and max value of strength */
    let strength_min = adv_strength_min(strength);
    let strength_max = adv_strength_max(strength);

    // calculate metric1
    return metric1_calculator(input.numFiles, strength_min, strength_max); // range [0,100]
}

function calculate(counter, input) {
    let metric1_res = adversary(input);
    let health = 6, location = 6, job = 6, other = 6;

    // calculate metric2 category health
    if (input.checkAge || input.checkBody || input.checkGender || input.checkHealth || input.checkSports) {
        // range [0,100]
        let health_res = metric2_calculator(input.numFiles, counter[0], metric1_res);
        // scale the privacy value individual
        let scale = get_scale_desc(input.q2);
        health_res = Math.min(100, Math.round(scale * health_res));
        health = scale_grade(health_res); // range [1,6]
    }
    // calculate metric2 category location
    if (input.checkCity || input.checkCountry || input.checkGPS) {
        // range [0,100]
        let location_res = metric2_calculator(input.numFiles, counter[1], metric1_res);
        // scale the privacy value individual
        let scale = get_scale_desc(input.q3);
        location_res = Math.min(100, Math.round(scale * location_res));
        location = scale_grade(location_res); // range [1,6]
    }
    // calculate metric2 category job
    if (input.checkDegree || input.checkGrades || input.checkJob) {
        // range [0,100]
        let job_res = metric2_calculator(input.numFiles, counter[2], metric1_res);
        // scale the privacy value individual
        let scale = get_scale_desc(input.q4);
        job_res = Math.min(100, Math.round(scale * job_res));
        job = scale_grade(job_res); // range [1,6]

    }
    // calculate metric2 category other
    if (input.checkConnection || input.checkOther) {
        let other_res = Math.min(100, metric2_calculator(input.numFiles, counter[3], metric1_res)); // range [0,100]
        other = scale_grade(other_res); // range [1,6]
    }

    /* calculate the overall privacy value based on these 4 categories */
    let privacy = Math.min(6, (job + health + location + other) / 4.0); // range [1,6]
    return score_to_style(privacy);
}

export default function computePrivacyMetric(input) {
    let counter = [0, 0, 0, 0];
    counter[0] = input.numAge + input.numBody + input.numGender + input.numHealth + input.numSport;
    counter[1] = input.numCity + input.numCountry + input.numGPS;
    counter[2] = input.numDegree + input.numJob + input.numGrade;
    counter[3] = input.numConnection + input.numOther;

    return calculate(counter, input);
}