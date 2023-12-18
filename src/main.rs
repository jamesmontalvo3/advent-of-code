// use regex::Regex;
use std::io;
mod day1a;
mod day1b;

fn main() {
    
    println!("Pick the challenge to run (e.g. 1a, 1b, 2a, ...");

    let challenge_func: fn();

    loop {

        let mut challenge = String::new();

        io::stdin()
            .read_line(&mut challenge)
            .expect("Failed to read line");

        challenge_func = match challenge.trim() {
            "1a" => day1a::answer,
            "1b" => day1b::answer,
            _ => {
                println!("That is not a valid challenge, try again");
                continue;
            }
        };

        break;
    }

    challenge_func();
}

