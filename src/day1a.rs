use std::fs;

pub fn answer () {

    println!("Starting...");

    let file = "./inputs/day1/calibrationData.txt";
    // let file = "./inputs/day1/testData.txt";
    // let file = "./inputs/day1/testData2.txt";

    let contents = fs::read_to_string(file)
        .expect("Should have been able to read the file");

    let lines = contents.split("\n");

    let mut total: i32 = 0;
    let mut i: i32 = 0;

    for line in lines {
        i += 1;
        let chars = line.split("");

        // let mut int_chars = String::new();
        let mut first = String::new();
        let mut second = String::new();

        for char in chars {
            let num: i32 = match char.parse() {
                Ok(num) => num,
                Err(_) => continue
            };
            if first == "" {
                first = num.to_string();
                second = num.to_string();
            } else {
                second = num.to_string();
            }

            // int_chars.push_str(&num.to_string())
        }

        println!("Line {i}, was {total}, numeric characters are {first} and {second}");
        
        let both = first + &second;

        let intint: i32 = both.parse().expect("Should have only found numbers here");

        total += intint;

    }

    println!("Total: {}", total); // my total: 54159

    // println!("this is a test: {}", contents);
}

