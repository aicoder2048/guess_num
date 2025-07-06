import random
from colorama import init, Fore, Back, Style

# 初始化 colorama
def main():
    init(autoreset=True)
    border = Fore.LIGHTYELLOW_EX + Style.BRIGHT + "★" * 32
    print(border)
    print(Fore.LIGHTMAGENTA_EX + Style.BRIGHT + "  🎉 欢迎来到猜数字游戏！🎉  ")
    print(border)
    print(Fore.LIGHTCYAN_EX + "我已经想好了一个 1 到 100 之间的数字。")
    print(Fore.LIGHTCYAN_EX + "你能猜到它是多少吗？\n")
    print(Fore.LIGHTGREEN_EX + "每次输入后会有提示哦，加油！\n")

    number = random.randint(1, 100)
    attempts = 0

    while True:
        try:
            guess = input(Fore.LIGHTBLUE_EX + Style.BRIGHT + "请输入你的猜测（1-100）：")
            guess = int(guess)
            attempts += 1
            if guess < number:
                print(Back.LIGHTYELLOW_EX + Fore.RED + " 太小啦！再试试吧！\n" + Style.RESET_ALL)
            elif guess > number:
                print(Back.LIGHTWHITE_EX + Fore.MAGENTA + " 太大啦！再试试吧！\n" + Style.RESET_ALL)
            else:
                print(Back.LIGHTGREEN_EX + Fore.BLACK + Style.BRIGHT + f"🎊 恭喜你！猜对啦！你一共猜了 {attempts} 次！🎊\n" + Style.RESET_ALL)
                break
        except ValueError:
            print(Back.LIGHTRED_EX + Fore.WHITE + "⚠️ 请输入有效的整数！\n" + Style.RESET_ALL)

    print(border)
    print(Fore.LIGHTMAGENTA_EX + Style.BRIGHT + "  感谢游玩，再见！🌈  ")
    print(border)

if __name__ == "__main__":
    main()
