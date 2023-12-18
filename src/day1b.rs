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

    let words = [
        (1, "one"), 
        (2, "two"), 
        (3, "three"), 
        (4, "four"), 
        (5, "five"), 
        (6, "six"), 
        (7, "seven"), 
        (8, "eight"), 
        (9, "nine")
    ];

    for line in lines {
        i += 1;

        // let mut int_chars = String::new();
        let mut first = String::new();
        let mut second = String::new();
        let mut first_index: usize = 0;
        let mut second_index: usize = 0;

        let mut j: usize = 0;
        while j < line.len() {
            let char = &line[j..j+1];
            
            let mut num: i32 = -1;

            // two1nine
            for (value, word) in words {
                if char == value.to_string() {
                    j += 1;
                    num = value;
                    break;
                } else {
                    let end_of_word = j + word.len();
                    if end_of_word > line.len() {
                        continue;
                    } else if &line[j..end_of_word] == word {
                        j += 1;
                        num = value;
                        break;
                    }
                }
            }

            if num == -1 {
                j += 1;
                continue;
            }

            if first == "" {
                first = num.to_string();
                second = num.to_string();
                first_index = j - 1;
                second_index = j - 1;
            } else {
                second = num.to_string();
                second_index = j - 1;
            }
        }


        let both = first.clone() + &second;
        
        let intint: i32 = both.parse().expect("Should have only found numbers here");

        // let old_total = total;

        total += intint;
        
        let fmt_line = format!("{:0>4}", i);
        println!("Line {fmt_line} | {line}");

        //                                       "Line 0000 | "
        let mut locations = String::from("          |");
        for k in 0..(line.len() + 2) {
            locations += if k > 0 && (k - 1 == first_index || k - 1 == second_index) {
                "^"
            } else if k == first_index {
                &first
            } else if k > 1 && k - 2 == second_index {
                &second
            } else {
                " "
            }
        }
        println!("{}", locations);

        // println!("{first},{second}=>{intint} from {line}; {old_total}=>{total}");
        // println!("{i}\t{intint}\t{old_total}\t{line}");
    }

    println!("Total: {}", total);

    // println!("this is a test: {}", contents);
}